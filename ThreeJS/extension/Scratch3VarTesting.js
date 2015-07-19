(function(ext) {

    var items = ["one", "two", "three"];
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.my_first_block = function() {
        //ext._shutdown();
        //ext2 = {};
        console.log(ScratchExtensions);
        //ScratchExtensions.unregister('My first extension');
        ScratchExtensions.register('My first extension', descriptor, ext);

    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block %m.Scenes', 'my_first_block'],
        ],
        menus: {
                Scenes: items, 
            }
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});