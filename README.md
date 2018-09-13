# Illustrated Verdict
EFM Viewer

Install
1. Clone repository
2. run '$npm install' (from command line)
3. run '$gulp copy'
3. run '$gulp watch'


https://projectclarion.com/documentation/architecture/
MyProject/
|--build/
|
|--src/
|  |--sass/
|  |  |--00_Abstracts/     # Variables, Functions, Mixins, and Placeholders
|  |  |
|  |  |--01_Base/          # Resets/Normalize, Typography Rules, Etc.
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--02_Vendors/       # Style sheets provided by a third party such as themes or plug-ins
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--03_Elements/      # Styles for HTML tags, such as a form label, an input or a button
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--04_Components/    # Cards, Carousels, and Navbars
|  |  |  |--index.scss     # Manifest File
|  |  |  
|  |  |--05_Layouts/       # Grid System, Header, Footer, and Sidebars
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--06_Pages/         # Page specific styles
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--07_Utilities/     # Utilities and Helper Classes
|  |  |  |--index.scss     # Manifest File
|  |  |
|  |  |--styles.scss/      # Main Sass Manifest
|  |
|  |--scripts/
|     |--components/       # Component-Specific Scripts
|     |--services/         # Reusable Functionality
|     |--main.js
|   
|--index.html
|--package.json
|--postcss.config.js
|--webpack.config.js
