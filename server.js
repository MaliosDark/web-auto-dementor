const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // Middleware to handle form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/analyze', async (req, res) => {
  try {
    const { domain } = req.body;
    const commonWords = getCommonWords(); // Get words to check from the JSON file
    const analysisResults = await analyzeContent(domain, commonWords);
    res.send(analysisResults);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

async function analyzeContent(url, commonWords) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const content = await page.content();

    const wordCounts = {};
    commonWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      wordCounts[word] = (content.match(regex) || []).length;
    });

    const totalWords = Object.values(wordCounts).reduce((acc, count) => acc + count, 0);
    const percentages = {};
    Object.entries(wordCounts).forEach(([word, count]) => {
      percentages[word] = (count / totalWords) * 100 || 0;
    });

    return generateHTMLResults(percentages);
  } finally {
    await browser.close();
  }
}

function generateHTMLResults(percentages) {
  // Read the content of the analysis_results.html file
  const htmlContent = fs.readFileSync('analysis_results.html', 'utf8');

  // Modify the content based on the provided percentages
  const modifiedContent = htmlContent.replace('${"-".repeat(25)}', '<hr>');

  // Sorting the percentages
  const sortedPercentages = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a);

  // Identify words with a percentage greater than 0 and apply bold formatting
  const boldedContent = sortedPercentages
    .map(([word, percentage]) => percentage > 0 ? `<b>${word}\t\t${percentage.toFixed(2)}%</b><br>` : `${word}\t\t${percentage.toFixed(2)}%<br>`)
    .join('');

  // Replace the placeholder with the dynamic content
  const finalContent = modifiedContent.replace('<!--PERCENTAGES_CONTENT-->', boldedContent);

  // Add donut chart
  const donutChartCanvas = '<canvas id="donutChart" width="400" height="200"></canvas>';
  const finalContentWithDonut = finalContent.replace('<!--DONUT_CHART-->', donutChartCanvas);

  // Add line chart
  const lineChartCanvas = '<canvas id="lineChart" width="400" height="200"></canvas>';
  const finalContentWithLine = finalContentWithDonut.replace('<!--LINE_CHART-->', lineChartCanvas);

  // Add bar chart
  const barChartCanvas = '<canvas id="barChart" width="400" height="200"></canvas>';
  const finalContentWithBar = finalContentWithLine.replace('<!--BAR_CHART-->', barChartCanvas);

  return finalContentWithBar;
}

function getCommonWords() {
  const rawData = fs.readFileSync('common_words.json');
  return JSON.parse(rawData);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
