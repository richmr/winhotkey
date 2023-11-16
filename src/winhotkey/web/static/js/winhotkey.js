
function activateDelayTypeButton(button_id) {
    $(`#${button_id}`).click(function (e) { 
        e.preventDefault();
        hotkey = $(`#${button_id}`).closest(".row").find(".hkey").val();
        index = $(`#${button_id}`).closest(".row").find(".index").val();
        get_params = {
            index:index,
            delay:3.0
        }
        $.ajax({
            type: "GET",
            url: "/api/type_phrase",
            dataType: "json",
            data:get_params,
            success: function (response) {
                $.toast({ 
                    text : "Your phrase will type when this toast closes.\nPut focus on the target input box", 
                    showHideTransition : 'slide',  // It can be plain, fade or slide
                    bgColor : 'red',              // Background color for toast
                    textColor : '#eee',            // text color
                    allowToastClose : false,       // Show the close button or not
                    hideAfter : 3000,              // `false` to make it sticky or time in miliseconds to hide after
                    // stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                    textAlign : 'center',            // Alignment of text i.e. left, right, center
                    position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                  })
                console.log(`${hotkey} sent for delayed typing.`)                                  
                },
            error: function( jqXHR, textStatus, errorThrown ) {
                message = `delay type failed because ${errorThrown}`;
                console.log(message);
            }
        });
    }
    );
}

function activateCopyButton(button_id) {
    $(`#${button_id}`).click(function (e) { 
        e.preventDefault();
        phrase = $(`#${button_id}`).closest(".row").find(".phrase").val();
        navigator.clipboard.writeText(phrase);
        $(`#${button_id}`).blur();
        $.toast({ 
            text : "Copied to clipboard", 
            showHideTransition : 'slide',  // It can be plain, fade or slide
            bgColor : 'blue',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
            // stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
    });
}


function activateSaveButton (button_id) {
    $(`#${button_id}`).click(function (e) { 
        e.preventDefault();
        hotkey = $(`#${button_id}`).closest(".row").find(".hkey").val();
        phrase = $(`#${button_id}`).closest(".row").find(".phrase").val();
        index = $(`#${button_id}`).closest(".row").find(".index").val();
        to_post = {
            index:index,
            assigned_key:hotkey,
            phrase:phrase
        };
        $.ajax({
            type: "POST",
            url: "/api/hotkeys",
            data: JSON.stringify(to_post),
            dataType: "json",
            contentType: 'application/json',
            processData: false,
            success: function (response) {
                $.toast({ 
                    text : "Hotkey saved and ready for use.", 
                    showHideTransition : 'slide',  // It can be plain, fade or slide
                    bgColor : 'green',              // Background color for toast
                    textColor : '#eee',            // text color
                    allowToastClose : false,       // Show the close button or not
                    hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
                    // stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                    textAlign : 'left',            // Alignment of text i.e. left, right, center
                    position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                  })
                console.log(`${hotkey} with ${phrase} saved`)
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                message = `saving failed because ${errorThrown}`;
                console.log(message);
            }
        });
    });
}

function addHotkeyRow(hotkey) {
    index = `index_${hotkey.index}`;
    index_id = `${index}_index`;
    hkey_id = `${index}_hkey`;
    phrase_id = `${index}_phrase`;
    dtype_button_id = `${index}_dtype`;
    copy_button_id = `${index}_copy`;
    save_button_id = `${index}_save`;
    assigned_key = hotkey.assigned_key;
    phrase = hotkey.phrase;
    toadd = `<div id="${index}" class="row">` +
                `<div class="three columns">` +
                    `<input type="hidden" id="${index_id}" class="index" value="">` +
                    `<input type="text" id="${hkey_id}" class="hkey" placeholder="Assigned keys" >` +
                `</div>` +
                `<div class="three columns">` +
                    `<input type="text" id="${phrase_id}" class="phrase" placeholder="Phrase" >` +
                `</div>` +
                `<div class="six columns">` +
                    `<button id="${dtype_button_id}" class="button-primary">Delay Type</button> ` +
                    `<button id="${copy_button_id}" class="button-primary">Copy</button> `  +
                    `<button id="${save_button_id}">Save</button> ` +
                `</div>` +
            `</div>`;    
    $("#all_hotkeys").append(toadd);
    // Set the phrase and key values programmatically to handle possible injection from special characters
    $(`#${index_id}`).val(hotkey.index)
    $(`#${hkey_id}`).val(assigned_key);
    $(`#${phrase_id}`).val(phrase);

    //Activate the buttons
    activateDelayTypeButton(dtype_button_id);
    activateCopyButton(copy_button_id);
    activateSaveButton(save_button_id);

}

function loadHotkeys() {
    $("#all_hotkeys").empty();
    $.ajax({
        type: "GET",
        url: "/api/hotkeys",
        dataType: "json",
        success: function (response) {
            response.forEach((hotkey, index, array) => {
                addHotkeyRow(hotkey);                                  
            });
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            message = `loadHotkeys failed because ${errorThrown}`;
            console.log(message);
        }
    });
}


$(document).ready(function() {

    loadHotkeys();
    
})