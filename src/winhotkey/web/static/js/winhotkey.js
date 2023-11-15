
function addHotkeyRow(hotkey) {
    index = `index_${hotkey.index}`;
    assigned_key = hotkey.assigned_key;
    phrase = hotkey.phrase;
    toadd = `<div id="${index}" class="row">` +
                `<div class="three columns">` +
                    `<input type="text" id="${index}_hkey" placeholder="Assigned keys" >` +
                `</div>` +
                `<div class="three columns">` +
                    `<input type="text" id="${index}_phrase" placeholder="Phrase" >` +
                `</div>` +
                `<div class="six columns">` +
                    `<button id="${index}_dtype" class="button-primary">Delay Type</button> ` +
                    `<button id="${index}_copy" class="button-primary">Copy</button> `  +
                    `<button id="${index}_save">Save</button> ` +
                `</div>` +
            `</div>`;    
    $("#all_hotkeys").append(toadd);
    // Set the phrase and key values programmatically to handle possible injection from special characters
    $(`#${index}_hkey`).val(assigned_key);
    $(`#${index}_phrase`).val(phrase);

    //Activate the buttons

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