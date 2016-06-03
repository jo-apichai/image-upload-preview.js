(function($) {

  $.fn.imageUploadPreview = function() {
    this.each(function() {
      var self = $(this);
      var input = self.find('input[type=file]');
      var preview = self.find('.image-preview');
      var newElems = self.find('.image-new');
      var existsElems = self.find('.image-exists');

      var setPreviewImage = function() {
        if(input.prop("files")[0]) {
          var reader = new FileReader();

          reader.onload = function(e) {
            var img = $('<img/>', { src: e.target.result })
            preview.html(img);
            newElems.hide();
            existsElems.show();
          }

          reader.readAsDataURL(input.prop("files")[0])
        } else {
          existsElems.hide();
          newElems.show();
        }
      }

      var resetFileInput = function() {
        preview.html('');
        input.wrap('<form>').closest('form').get(0).reset();
        input.unwrap();
        existsElems.hide();
        newElems.show();
      }

      if(preview.find('img').length > 0) {
        existElems.show();
      } else {
        setPreviewImage()
        newElems.show()
      }

      // Trigger click on file input to open file selection window
      self.on('click', '.image-trigger', function() {
        input.click();
      });

      // Show preview image when user select a file
      input.on('change', function() {
        if(input.prop("files")[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
          setPreviewImage();
        } else {
          resetFileInput();
        }
      });

      // Remove preview image and show upload form when user click on remove button
      self.on('click', '.image-remove', function() {
        resetFileInput();
      });

      // Set file input when user drop image on uploader
      self.on('dragover', function(e) {
        input.css('display', 'block');
      })
      .on('dragleave', function() {
        input.css('display', 'none');
      })
      .on('drop', function(e) {
        input.css('display', 'none');
      });
    });
  }

  return this;

}( jQuery ));
