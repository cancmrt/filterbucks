function filterbucksEngine(event){
    var findedDeeps = [];
    var baseConfiguration = event.data;
    var eventFocusItem = this;
    if(baseConfiguration.type == "button" || baseConfiguration.type == "a"){
        if(jQuery(eventFocusItem).is("["+baseConfiguration.buttonCheckSelector+"]"))
        {
            jQuery(eventFocusItem).removeAttr(baseConfiguration.buttonCheckSelector);
            jQuery(eventFocusItem).css("opacity", "1");
        }
        else{
            jQuery(eventFocusItem).attr(baseConfiguration.buttonCheckSelector,"");
            jQuery(eventFocusItem).css("opacity", "0.5");
        }
    }
    jQuery(baseConfiguration.parents).each(function(index){
        if(baseConfiguration.type == "select")
        {
            var detectCheckSelector = $(this).find(baseConfiguration.checkSelector)
            if (detectCheckSelector.length>0) {
                findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp),10));
            }
        }
        else if(baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a")
        {
            var detectCheckSelector = $(this).filter(baseConfiguration.checkSelector)
            if (detectCheckSelector.length>0) {
                findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp),10));
            }
        }
        
        
    });
    var uniqueDeeps = findedDeeps.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    uniqueDeeps = uniqueDeeps.sort(function(a, b){return a - b});
    var deepElements = [];
    uniqueDeeps.forEach(deep => {

        var findedDeep = null;
        if(baseConfiguration.type == "select")
        {
            var findedDeep = jQuery(baseConfiguration.parents).filter("[data-"+baseConfiguration.dataDeepProp+"='" + deep + "']").find(baseConfiguration.checkSelector);
        }
        else if(baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a")
        {
            var findedDeep = jQuery(baseConfiguration.parents).filter(baseConfiguration.checkSelector).filter("[data-"+baseConfiguration.dataDeepProp+"='" + deep + "']");
        }
        jQuery(findedDeep !== null && jQuery(findedDeeps).length > 0)
        {
            deepElements.push(findedDeep);
        }
    });
    var possibleQueries = deepQueryCreator(baseConfiguration,deepElements);
    var classQuery = "";
    if(possibleQueries === null)
    {
        classQuery = baseConfiguration.baseClass;
    }
    else if(possibleQueries.length <= 0)
    {
        classQuery = baseConfiguration.baseClass;
    }
    else if(possibleQueries !== null && possibleQueries.length > 0)
    {
        possibleQueries.forEach(value => {
            classQuery += baseConfiguration.baseClass+value+","
        });
        classQuery = classQuery.substring(0, classQuery.length - 1);
    }
    jQuery(baseConfiguration.baseClass).css("display","none");
    jQuery(classQuery).css("display","");
    
}
function deepQueryCreator(baseConfiguration,deepElements, queries = null){
    
    if(deepElements.length === 0)
    {
        return queries;
    }
    if(queries === null)
    {
        queries = [];
    }
    var copyDeepElements = deepElements.slice();
    var takenLayer = copyDeepElements.shift();
    var extendQueries = [];
    var detectedNone = jQuery(takenLayer).filter("[data-"+baseConfiguration.dataFlushProp+"='true']");
    if(jQuery(detectedNone).length <= 0)
    {
            jQuery(takenLayer).each(function(index) {
                var element = this;
                if(queries.length == 0)
                {
                    var classValue = "."+jQuery(element).attr("value");
                    extendQueries.push(classValue);
                    
                }
                else if(queries.length > 0)
                {
                    queries.forEach(query => {
                        var classValue = "."+jQuery(element).attr("value");
                        var newQuery = query + classValue;
                        extendQueries.push(newQuery);
                    });
                }
            });
    }
    else if(jQuery(detectedNone).length > 0){
        extendQueries = queries;
    }
    
    
    return deepQueryCreator(baseConfiguration,copyDeepElements,extendQueries);


}

jQuery.fn.filterbucks = function()
{
    var baseConfiguration = {
        parents: this,
        baseClass: ".filterbucks",
        dataDeepProp:"fbdeep",
        dataFlushProp: "fbflush",
        checkSelector: ":checked",
        buttonCheckSelector: "clicked",
        event:"change",
        type: jQuery(this)[0].tagName == "INPUT" ? jQuery(this)[0].type.toLowerCase() : jQuery(this)[0].tagName.toLowerCase()
    }
    this.filterbucksRunner(baseConfiguration);
}

jQuery.fn.filterbucksRunner = function(baseConfiguration){
    if(baseConfiguration.type === "button" || baseConfiguration.type === "a")
    {
        baseConfiguration.event = "click";
        baseConfiguration.checkSelector = "[clicked]";
    }
    if(baseConfiguration.type === "select")
    {
        baseConfiguration.checkSelector = "option:selected";
    }
    if(baseConfiguration.type === "radio" || baseConfiguration.type === "checkbox")
    {
        baseConfiguration.checkSelector = ":checked";
    }
    this.on(baseConfiguration.event,baseConfiguration,filterbucksEngine);
    
        
}
