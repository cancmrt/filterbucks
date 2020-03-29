function filterbucksEngine(event) {

    var baseConfiguration = event.data;

    var eventFocusItem = this;

    filterbucksStartEvent(baseConfiguration,eventFocusItem);

    if (baseConfiguration.type == "button" || baseConfiguration.type == "a") {

        buttonInitSelector(baseConfiguration,eventFocusItem);

    }
    else{
        jQuery(baseConfiguration.parents).removeClass(baseConfiguration.filterTargetElementClass);
        jQuery(eventFocusItem).addClass(baseConfiguration.filterTargetElementClass);
    }
    var uniqueDeeps = giveUniqDeepCounts(baseConfiguration);
    var allUniqueDeeps = allUniqDeepCounts(baseConfiguration);


    flusher(baseConfiguration,uniqueDeeps,eventFocusItem);

    
    var deepElements = giveDeepElements(baseConfiguration,uniqueDeeps);
    var possibleQueries = deepQueryCreator(baseConfiguration, deepElements);
    if(hasHideUnrelateds(baseConfiguration))
    {
        filterHider(baseConfiguration, deepElements, eventFocusItem, uniqueDeeps,allUniqueDeeps, possibleQueries);
    }
    var classQuery = possibleQueryGenerator(baseConfiguration, possibleQueries);
    jQuery(baseConfiguration.baseClass).css("display", "none");
    jQuery(baseConfiguration.baseClass).removeClass(baseConfiguration.filterShowClass);
    jQuery(baseConfiguration.baseClass).removeClass(baseConfiguration.filterHideClass);
    jQuery(baseConfiguration.baseClass).addClass(baseConfiguration.filterHideClass);
    jQuery(classQuery).css("display", "");
    jQuery(classQuery).removeClass(baseConfiguration.filterHideClass);
    jQuery(classQuery).addClass(baseConfiguration.filterShowClass);

    filterbucksEndEvent(baseConfiguration,eventFocusItem);

}


function filterbucksStartEvent(baseConfiguration,eventFocusItem){
    jQuery(baseConfiguration.parents).trigger(baseConfiguration.filterStartEvent,eventFocusItem);
}
function filterbucksEndEvent(baseConfiguration,eventFocusItem){
    jQuery(baseConfiguration.parents).trigger(baseConfiguration.filterEndEvent,eventFocusItem);
}
function hasButtonCssOpacity(baseConfiguration){
    if(
        baseConfiguration.extraConfiguration && 
        baseConfiguration.extraConfiguration.ButtonCssOpacity && 
        baseConfiguration.extraConfiguration.ButtonCssOpacity === true
        )
    {
        return true;
    }
    else{
        return false;
    }
}
function hasHideUnrelateds(baseConfiguration){
    if(baseConfiguration.extraConfiguration 
        && baseConfiguration.extraConfiguration.HideUnrelateds 
        && baseConfiguration.extraConfiguration.HideUnrelateds === true)
    {
        return true;
    }
    else{
        return false;
    }

}
function hasBtnSingleChoise(baseConfiguration){
    if(baseConfiguration.extraConfiguration 
        && baseConfiguration.extraConfiguration.BtnSingleChoise 
        && baseConfiguration.extraConfiguration.BtnSingleChoise === true)
    {
        return true;
    }
    else{
        return false;
    }

}
function buttonInitSelector(baseConfiguration,eventFocusItem)
{
    if(hasBtnSingleChoise(baseConfiguration))
    {
        var selectedDeepCount = jQuery(eventFocusItem).data(baseConfiguration.dataDeepProp);
        var alreadySelectedBtn = jQuery(baseConfiguration.parents).filter("[" + baseConfiguration.buttonCheckSelector + "]").filter('[data-'+baseConfiguration.dataDeepProp+' = "'+selectedDeepCount+'"]');
        if(alreadySelectedBtn.length == 1)
        {
            buttonSelectorRemove(baseConfiguration,alreadySelectedBtn);
            buttonSelectorAdd(baseConfiguration,eventFocusItem);
        }
        else if(alreadySelectedBtn.length < 1)
        {
            buttonSelectorAdd(baseConfiguration,eventFocusItem);
        }
        
    }
    else{
        if (jQuery(eventFocusItem).is("[" + baseConfiguration.buttonCheckSelector + "]")) {

            buttonSelectorRemove(baseConfiguration,eventFocusItem);
        }
        else {
            
            buttonSelectorAdd(baseConfiguration,eventFocusItem);
        }
    }
}
function buttonSelectorRemove(baseConfiguration,item)
{
    jQuery(item).removeAttr(baseConfiguration.buttonCheckSelector);
    jQuery(item).removeClass(baseConfiguration.filterTargetElementClass);

    if (hasButtonCssOpacity(baseConfiguration))
    {
        jQuery(item).css("opacity", "1");
    }
}
function buttonSelectorAdd(baseConfiguration,item){
    jQuery(item).attr(baseConfiguration.buttonCheckSelector, "");
    jQuery(item).addClass(baseConfiguration.filterTargetElementClass);
    if (hasButtonCssOpacity(baseConfiguration))
    {
        jQuery(item).css("opacity", "0.5");
    }
}
function giveUniqDeepCounts(baseConfiguration)
{

   var findedDeeps = [];

    jQuery(baseConfiguration.parents).each(function (index) {
        if (baseConfiguration.type == "select") {
            var detectCheckSelector = $(this).find(baseConfiguration.checkSelector)
            if (detectCheckSelector.length > 0) {
                findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp), 10));
            }
        }
        else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a") {
            var detectCheckSelector = $(this).filter(baseConfiguration.checkSelector)
            if (detectCheckSelector.length > 0) {
                findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp), 10));
            }
        }


    });

    var uniqueDeeps = findedDeeps.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });

    uniqueDeeps = uniqueDeeps.sort(function (a, b) { return a - b });

    return uniqueDeeps;
}
function allUniqDeepCounts(baseConfiguration)
{

   var findedDeeps = [];

    jQuery(baseConfiguration.parents).each(function (index) {
        if (baseConfiguration.type == "select") {
            findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp), 10));
        }
        else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a") {
            findedDeeps.push(parseInt(jQuery(this).data(baseConfiguration.dataDeepProp), 10));
        }


    });

    var uniqueDeeps = findedDeeps.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });

    uniqueDeeps = uniqueDeeps.sort(function (a, b) { return a - b });

    return uniqueDeeps;
}
function giveDeepElements(baseConfiguration, uniqueDeeps)
{
    var deepElements = [];
    uniqueDeeps.forEach(function(deep) {

        var findedDeep = null;
        if (baseConfiguration.type == "select") {
            var findedDeep = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deep + "']").find(baseConfiguration.checkSelector);
        }
        else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a") {
            var findedDeep = jQuery(baseConfiguration.parents).filter(baseConfiguration.checkSelector).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deep + "']");
        }
        jQuery(findedDeep !== null && jQuery(findedDeep).length > 0)//suspicion bug
        {
            deepElements.push(findedDeep);
        }
    });

    return deepElements;

}
function flusher(baseConfiguration,uniqueDeeps,eventFocusItem) {
    var deepCount = parseInt(jQuery(eventFocusItem).data(baseConfiguration.dataDeepProp), 10);
    var realDeepCount = parseInt(jQuery(eventFocusItem).data(baseConfiguration.dataDeepProp), 10);
    
    if (hasFlushProp(baseConfiguration, eventFocusItem))
    {
        deepCount--;
    }
	uniqueDeeps.forEach(function(deep){
		
		if(deepCount < deep){

            var flushThis = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deep + "']");

			if (baseConfiguration.type == "select") {
                jQuery(flushThis).find("option").each(function(){
                    if(hasFlushProp(baseConfiguration,this))
                    {
                        jQuery(flushThis).val($(this).val());
                    }
                });
            }
            else if (baseConfiguration.type == "button" || baseConfiguration.type == "a") {
                jQuery(flushThis).each(function(){

                    if(hasFlushProp(baseConfiguration,this) && realDeepCount !== deep)
                    {
                        buttonSelectorAdd(baseConfiguration,this);
                    }

                    if(!hasFlushProp(baseConfiguration,this))
                    {
                        buttonSelectorRemove(baseConfiguration,this);
                    }
                });
            }
			else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox") {
                jQuery(flushThis).each(function(){

                    if(hasFlushProp(baseConfiguration,this) && realDeepCount !== deep)
                    {
                        jQuery(this).prop("checked", true);
                    }

                    if(!hasFlushProp(baseConfiguration,this))
                    {
                        jQuery(this).prop("checked", false);
                    }
                });
                
            }
			
		}
	});
	
}
function hasFlushProp(baseConfiguration,item)
{
    if (
        (jQuery(item).attr("data-" + baseConfiguration.dataFlushProp)) && 
        (jQuery(item).attr("data-" + baseConfiguration.dataFlushProp) === "true")
        )
    {
        return true;
    }
    else{
        return false;
    }
}
function possibleQueryGenerator(baseConfiguration, possibleQueries) {
    var classQuery = "";
    if (possibleQueries === null) {
        classQuery = baseConfiguration.baseClass;
    }
    else if (possibleQueries.length <= 0) {
        classQuery = baseConfiguration.baseClass;
    }
    else if (possibleQueries !== null && possibleQueries.length > 0) {
        possibleQueries.forEach(function(value) {
            classQuery += baseConfiguration.baseClass + value + ","
        });
        classQuery = classQuery.substring(0, classQuery.length - 1);
    }

    return classQuery;
}
function filterHider(baseConfiguration, deepElements, eventFocusItem, uniqueDeeps,allUniqueDeeps, possibleQueries) {
    var deepCount = parseInt(jQuery(eventFocusItem).data(baseConfiguration.dataDeepProp), 10);
    var couldntFind = [];
    if (deepCount != deepElements.length) {
        var discoverThisDeep = deepCount + 1;
        if (baseConfiguration.type == "select") {
            var unSortedDeep = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + discoverThisDeep + "']");
            jQuery(unSortedDeep).find("option").each(function () {
                jQuery(this).removeClass(baseConfiguration.relatedFilterShowClass);
                jQuery(this).removeClass(baseConfiguration.relatedFilterHideClass);
                jQuery(this).addClass(baseConfiguration.relatedFilterShowClass);
                jQuery(this).show();
            });
            var selectedElement = jQuery(eventFocusItem).find(baseConfiguration.checkSelector);
            if (!hasFlushProp(baseConfiguration,selectedElement)) {
                jQuery(unSortedDeep).find("option").each(function () {
                    if (!hasFlushProp(baseConfiguration,this)) {
                        var unSelectedValue = jQuery(this).val();
                        var findedAny = false;
                        possibleQueries.forEach(function(value) {
                            investgatorClass = baseConfiguration.baseClass + value + "." + unSelectedValue;
                            var countOfSelector = jQuery(investgatorClass).length;
                            if (countOfSelector > 0) {
                                findedAny = true;
                            }
                        });
                        if (!findedAny) {
                            jQuery(this).removeClass(baseConfiguration.relatedFilterShowClass);
                            jQuery(this).removeClass(baseConfiguration.relatedFilterHideClass);
                            jQuery(this).addClass(baseConfiguration.relatedFilterHideClass);
                            jQuery(this).hide();
                        }
                        findedAny = false;
                    }

                });
            }
        }
        else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a") {
            var unSortedDeep = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + discoverThisDeep + "']");
            jQuery(unSortedDeep).each(function () {
                jQuery(this).show();
            });
            var selectedItem = undefined;
            if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox") {
                selectedElement = jQuery(eventFocusItem);
            }
            if (baseConfiguration.type == "button" || baseConfiguration.type == "a") {
                selectedElement = jQuery(baseConfiguration.parents).filter(baseConfiguration.checkSelector).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deepCount + "']");
            }

            if (!hasFlushProp(baseConfiguration,selectedElement)) {
                jQuery(unSortedDeep).each(function () {
                    if (!hasFlushProp(baseConfiguration,this)) {
                        var unSelectedValue = undefined;
                        if (baseConfiguration.type === "a") {
                            unSelectedValue = jQuery(this).attr("value");
                        }
                        else {
                            unSelectedValue = jQuery(this).val();
                        }

                        var findedAny = false;
                        possibleQueries.forEach(function(value) {
                            investgatorClass = baseConfiguration.baseClass + value + "." + unSelectedValue;
                            var countOfSelector = jQuery(investgatorClass).length;
                            if (countOfSelector > 0) {
                                findedAny = true;
                            }
                        });
                        if (!findedAny && possibleQueries.length > 0) {
                            jQuery(this).removeClass(baseConfiguration.relatedFilterShowClass);
                            jQuery(this).removeClass(baseConfiguration.relatedFilterHideClass);
                            jQuery(this).addClass(baseConfiguration.relatedFilterHideClass);
                            jQuery(this).hide();
                        }
                        
                        findedAny = false;
                    }

                });
            }
        }

    }
    
    if(deepElements.length <= 0)
    {
        allUniqueDeeps.forEach(function(deep) {
            if (baseConfiguration.type == "select") {
                var unSortedDeep = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deep + "']");
                jQuery(unSortedDeep).find("option").each(function () {

                    jQuery(this).removeClass(baseConfiguration.relatedFilterShowClass);
                    jQuery(this).removeClass(baseConfiguration.relatedFilterHideClass);
                    jQuery(this).addClass(baseConfiguration.relatedFilterShowClass);
                    jQuery(this).show();

                });
            }
            else if (baseConfiguration.type == "radio" || baseConfiguration.type == "checkbox" || baseConfiguration.type == "button" || baseConfiguration.type == "a") {
                var unSortedDeep = jQuery(baseConfiguration.parents).filter("[data-" + baseConfiguration.dataDeepProp + "='" + deep + "']");
                jQuery(unSortedDeep).each(function () {
                    jQuery(this).removeClass(baseConfiguration.relatedFilterShowClass);
                    jQuery(this).removeClass(baseConfiguration.relatedFilterHideClass);
                    jQuery(this).addClass(baseConfiguration.relatedFilterShowClass);
                    jQuery(this).show();
                });
            }
        });
    }
    return couldntFind;
}
function deepQueryCreator(baseConfiguration, deepElements, queries) {
	
	if(queries === undefined) {
      queries = null;
    }

    if (deepElements.length === 0) {
        return queries;
    }
    if (queries === null) {
        queries = [];
    }
    var copyDeepElements = deepElements.slice();
    var takenLayer = copyDeepElements.shift();
    var extendQueries = [];
    var detectedNone = jQuery(takenLayer).filter("[data-" + baseConfiguration.dataFlushProp + "='true']");
    if (jQuery(detectedNone).length <= 0) {
        jQuery(takenLayer).each(function (index) {
            var element = this;
            if (queries.length == 0) {
                var classValue = "." + jQuery(element).attr("value");
                extendQueries.push(classValue);

            }
            else if (queries.length > 0) {
                queries.forEach(function(query) {
                    var classValue = "." + jQuery(element).attr("value");
                    var newQuery = query + classValue;
                    extendQueries.push(newQuery);
                });
            }
        });
    }
    else if (jQuery(detectedNone).length > 0) {
        extendQueries = queries;
    }


    return deepQueryCreator(baseConfiguration, copyDeepElements, extendQueries);


}
jQuery.fn.filterbucks = function (extraConfiguration) {
    var baseConfiguration = {
        parents: this,
        baseClass: ".filterbucks",
        dataDeepProp: "fbdeep",
        dataFlushProp: "fbflush",
        checkSelector: ":checked",
        buttonCheckSelector: "clicked",
        event: "change",
        relatedFilterShowClass: "filterbucksRelatedShow",
        relatedFilterHideClass: "filterbucksRelatedHide",
        filterShowClass:"filterbucksFilteredShow",
        filterHideClass:"filterbucksFilteredHide",
        filterTargetElementClass:"filterbucksSelected",
        filterStartEvent:"filterbucks-start",
        filterEndEvent:"filterbucks-end",
        type: jQuery(this)[0].tagName == "INPUT" ? jQuery(this)[0].type.toLowerCase() : jQuery(this)[0].tagName.toLowerCase(),
        extraConfiguration:extraConfiguration
    }
    this.filterbucksRunner(baseConfiguration);
}

jQuery.fn.filterbucksRunner = function (baseConfiguration) {
    if (baseConfiguration.type === "button" || baseConfiguration.type === "a") {
        baseConfiguration.event = "click";
        baseConfiguration.checkSelector = "[clicked]";
    }
    if (baseConfiguration.type === "select") {
        baseConfiguration.checkSelector = "option:selected";
    }
    if (baseConfiguration.type === "radio" || baseConfiguration.type === "checkbox") {
        baseConfiguration.checkSelector = ":checked";
    }
	console.log(baseConfiguration);
    this.on(baseConfiguration.event, baseConfiguration, filterbucksEngine);


}
