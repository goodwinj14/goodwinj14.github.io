
(function(ext) {
    var items = {};
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.my_first_block = function() {
        // Code that gets executed when the block is run
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: items,
        menus: {
                Scenes: ['Grid','Grass','Blank'], 
            }
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});