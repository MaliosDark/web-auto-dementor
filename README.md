## Web Auto-Dementor

Web Auto-Dementor is a web-based content analysis tool that explores word repetition in a given website. This tool is an adaptation of the Python version available at [auto-dementor](https://github.com/Vgarcan/auto-dementor). It utilizes Puppeteer for web scraping and Express for building a simple web server.

## Features

- Analyzes the content of a specified website for word repetition.
- Generates a dynamic HTML report with word percentages.
- Presents results in a visually appealing format with charts.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/MaliosDark/web-auto-dementor.git
    cd web-auto-dementor
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the web server:

    ```bash
    npm start
    ```

    The server will be running on [http://localhost:3000](http://localhost:3000).

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the analysis tool.

## How to Use

1. Enter the target website's URL in the provided form.
2. Submit the form to initiate the analysis.
3. Receive a detailed report with word percentages, charts, and bolded keywords.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [auto-dementor](https://github.com/Vgarcan/auto-dementor) Python project.
- Built with [Express](https://expressjs.com/) and [Puppeteer](https://pptr.dev/).

Feel free to contribute, enhance, and share the magic of content analysis with Web Auto-Dementor! 🚀