(function($) {

  $.fn.extend({
    imageUploadPreview: function(options) {
      this.each(function() {
        var $this = $(this);
        var data = $this.data('image-upload-preview');

        if(!data) {
          obj = new ImageUploadPreview(this, options);
          $this.data('image-upload-preview', obj);
          obj.init();
        }
      });

      return this;
    }
  });

  var ImageUploadPreview = function(element, options) {
    if(!options || typeof options !== 'object') {
      options = {};
    }

    this.options = $.extend(this._defaultOptions, options);

    this.$self = $(element);
    this.$input = this.$self.find('input[type=file]');
    this.$previewContainer = this.$self.find(this.options.previewContainer);
    this.$newImageNodes = this.$self.find(this.options.newImageNodes);
    this.$existsImageNodes = this.$self.find(this.options.existsImageNodes);
  }

  ImageUploadPreview.prototype = {
    init: function() {
      if(this.$previewContainer.find('img').length > 0) {
        this.$existsImageNodes.show();
      } else {
        this._setPreviewImage();
        this.$newImageNodes.show();
      }

      this._bindEvents();
    },

    _defaultOptions: {
      container: '.image-uploader',
      previewContainer: '.image-preview',
      uploadButton: '.image-trigger',
      removeButton: '.image-remove',
      newImageNodes: '.image-new',
      existsImageNodes: '.image-exists'
    },

    _bindEvents: function() {
      var self = this;

      // Trigger click on file input to open file selection window
      this.$self.on('click', this.options.uploadButton, function() {
        self.$input.click();
      });

      // Show preview image when user select a file
      this.$input.on('change', function() {
        if(self.$input.prop("files")[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
          self._setPreviewImage();
        } else {
          self._resetFileInput();
        }
      });

      // Remove preview image and show upload form when user click on remove button
      this.$self.on('click', this.options.removeButton, function() {
        self._resetFileInput();
      });

      // Set file input when user drop image on uploader
      this.$self.on('dragover', function() {
        self.$input.css('display', 'block');
      })
      .on('dragleave', function() {
        self.$input.css('display', 'none');
      })
      .on('drop', function() {
        self.$input.css('display', 'none');
      });
    },

    _setPreviewImage: function() {
      if(this.$input.prop("files")[0]) {
        var self = this;
        var reader = new FileReader();

        reader.onload = function(e) {
          self.$previewContainer.html($('<img/>', { src: e.target.result }));
          self.$newImageNodes.hide();
          self.$existsImageNodes.show();
        }

        reader.readAsDataURL(this.$input.prop("files")[0]);
      } else {
        this.$existsImageNodes.hide();
        this.$newImageNodes.show();
      }
    },

    _resetFileInput: function() {
      this.$previewContainer.html('');
      this.$input.wrap('<form>').closest('form').get(0).reset();
      this.$input.unwrap();
      this.$existsImageNodes.hide();
      this.$newImageNodes.show();
    }
  }

}(jQuery));
