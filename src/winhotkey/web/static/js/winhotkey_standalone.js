var current_stored_rows = null;


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
            hideAfter : 1000,              // `false` to make it sticky or time in miliseconds to hide after
            // stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
    });
}

function activateSaveButton (button_id) {
    $(`#${button_id}`).click(function (e) { 
        e.preventDefault();
        // Change the stored rows, basically just iterate and make the list
        current_stored_rows = []
        $(`.hkey`).each(function (index, element) {
            current_stored_rows.push($(this).val());
        });
        saveStoredRows();
        $.toast({ 
            text : "Cut and paste ready to go", 
            showHideTransition : 'slide',  // It can be plain, fade or slide
            bgColor : 'green',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 1000,              // `false` to make it sticky or time in miliseconds to hide after
            // stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        });
    });
}

function addHotkeyRow(hotkey) {
    index = `index_${hotkey.index}`;
    index_id = `${index}_index`;
    hkey_id = `${index}_hkey`;
    phrase_id = `${index}_phrase`;
    copy_button_id = `${index}_copy`;
    save_button_id = `${index}_save`;
    toadd = `<div id="${index}" class="row">` +
                `<div class="four columns">` +
                    `<input type="hidden" id="${index_id}" class="index" value="">` +
                    `<input type="text" id="${hkey_id}" class="hkey" placeholder="Account name" >` +
                `</div>` +
                `<div class="four columns">` +
                    `<input type="text" id="${phrase_id}" class="phrase" placeholder="Phrase" >` +
                `</div>` +
                `<div class="four columns">` +
                    `<button id="${copy_button_id}" class="button-primary">Copy</button> `  +
                    `<button id="${save_button_id}" class="save_button">Store</button>` +
                `</div>` +
            `</div>`;    
    $("#all_hotkeys").append(toadd);
    // Set the phrase and key values programmatically to handle possible injection from special characters
    $(`#${index_id}`).val(hotkey.index)
    $(`#${hkey_id}`).val(hotkey.name);

    //Activate the buttons
    activateCopyButton(copy_button_id);
    activateSaveButton(save_button_id);

}

function loadHotkeys() {
    $("#all_hotkeys").empty();
    // Init the data
    getStoredRows();
    current_stored_rows.forEach( (account_name, index, array) => {
        var this_row = {
            name:account_name,
            index:index
        }
        addHotkeyRow(this_row);
        
    });
    setUpInputBoxes();
}


function setUpInputBoxes() {
    $(".hkey").each( function () {
        // On "enter" save
        $(this).on("keypress", function (event) {
            if (event.key == "Enter" || (!event.shiftKey && (event.key == "Tab"))) {
                event.preventDefault();
                // save the new key
                $(this).closest(".row").find(".save_button").click();
                // move to the associated phrase
                // $(this).closest(".row").find(".phrase").trigger("focus");
            }
        });
    });
    $(".phrase").each( function () {
        // keydown used here to capture "Tab"
        $(this).on( "keypress", function (event) {
            // If we tab out or enter, save and go to next.
            // If we reverse tab, just go to the hkey entry (automatic)
            if ((event.key == "Enter") || (!event.shiftKey && (event.key == "Tab"))) {
                event.preventDefault();
                // simulate save button click if there is actually data to save
                currentPhrase = $(this).val()
                if (currentPhrase.length > 0) {
                    $(this).closest(".row").find(".save_button").click();
                } 
                // move to next phrase (by using row siblings)
                // $(this).closest(".row").next().find(".hkey").trigger("focus");
            }
            
        });
    });
}

function getStoredRows() {
    /*
       I'm not storing passwords, so this is just a list/array of account names, which are just prompts to help
       you remember what passwoird is what
        
    */
    let stored_rows = JSON.parse(localStorage.getItem("whk_stored_rows"));
    if (stored_rows == null) {
        // Default set scoring_page_id to invalid number to allow for other comparisons to work well
        stored_rows = ["Normal User"];
        len_of_stored_rows = stored_rows.length
        for (i=0; i < (10 - len_of_stored_rows); i++) {
            stored_rows.push("");
        }
    }
    current_stored_rows = stored_rows;
}

function clearStoredRows() {
    localStorage.setItem("whk_stored_rows", null);
    getStoredRows();
}

function saveStoredRows() {
    localStorage.setItem("whk_stored_rows", JSON.stringify(current_stored_rows));
}

$(document).ready(function() {
    loadHotkeys();   
})