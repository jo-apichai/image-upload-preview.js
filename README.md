# image-upload-preview.js
A simple javascript snippet to show preview image before upload.

## Installation

Include javascript file.
```html
<script type="text/javascript" src="image-upload-preview.js"></script>
```

Include stylesheet file.
```html
<link rel="stylesheet" type="text/css" href="image-upload-preview.css">
```

## Usage

Add ``` .image-uploader ``` to the container.

Elements inside the container with ``` .image-new ``` are shown when the value of the file input inside container is not set and elements with ``` .image-exists ``` are shown when the value is set.

Element with ``` .image-trigger ``` will open file selection window when clicked.

A preview image will show inside element with ``` .image-preview ``` when user select an image.

Element with ``` .image-remove ``` will remove preview image and reset file input value when clicked.

Call ``` imageUploadPreview() ``` function to init image upload preview.
```javascript
$('.image-uploader').imageUploadPreview();
```
