# stock3 CKEditor 5 build

This custom CKEditor build is based on the classic [CKEditor 5](https://ckeditor.com/ckeditor-5/) build.

Please note that the repository on GitHub is mirrored and read-only.
If you find bugs or want to suggest features specific to this custom build, kindly contact us at kundenservice@stock3.com

## Usage notes
Please refer to the CKEditor documentation on how to initialize the editor build 

### Charting Plugin
The charting integration requires an adapter that will load the available chart images. At the time of writing this adapter must be configured as an editor extraPlugins.

A sample implementation for such an adapter and required configuration can be found in sample/index.html

## Development
### Develop
````
npm i
npm run watch
````
You can then open ``sample/index.html`` with any browser to test and debug your build

### Release
You can test a release build by running ``npm run build`` and opening ``sample/index.html`` in your browser.

Every commit to the main branch will trigger a new release. Version numbers are determined automatically using [Convetional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and updated and released with the help of the [Semantic Release](https://www.npmjs.com/package/semantic-release) tool
