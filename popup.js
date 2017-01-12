document.getElementById('myonoffswitch').addEventListener("change",function(){
    if (this.checked)
        chrome.storage.local.set({active: true});
    else
        chrome.storage.local.set({active: false});
});

chrome.storage.local.get('active',function(active){
    if (active.active) {
        document.getElementById('myonoffswitch').setAttribute("checked","checked");
    }
});
