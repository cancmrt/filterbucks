![enter image description here](https://i.ibb.co/hc5cX6w/filterbucks-logo-fw.png"FileterbucksLogo")

##  **Filterbucks**

Filterbucks is JQuery plugin which blazingly fast for filter operations based on using class selectors.

Filterbucks working with many Html elements with include hierarchical filter or multiple selection filter. You can use these elements for build filter selector.
 - Select 
 - Radio 
 - Checkbox 
 - Button
 -  A

You can access filterbucks using:

    npm install filterbucks

Or you can access directly by browser:

    https://unpkg.com/filterbucks@1.0.x/filterbucks.min.js

Our current version is 1.0.2 so link should be :

    https://unpkg.com/filterbucks@1.0.1/filterbucks.min.js


## **How filterbucks working?**

Filterbucks working with html element's class attribute. You should put filter key values in class attribute and then build your filter element for choose filter, that's it, filterbucks handle the rest of operations.

## **How can I put filters on class attribute?**

This is easy peasy situation. For example you decide to filter videos by selection in your page. Take every video attribute or parent div etc, put class attribute that element, inside of class attribute first write "filterbucks" keyword, this will tell the plugin which elements filterable on page and then write your keyword for filters by using space.
For example:

    <div  class="filterbucks America InDoor">
    
	    <h1>America InDoor</h1>
    
    </div>

    <div  class="filterbucks Turkey OutDoor">
    
	    <h1>Turkey Outdoor</h1>
    
    </div>
    

## **How can I build filter selector?**

This is quite easy too. Let me explain to you.  Some data-* props for important for filterbucks plugin. **These are data-fbdeep,data-fbflush and value parameters in filter elements**. Let's tl;dr this props.

- data-fbdeep: For choose value filter level
- data-fbflush: This attribute using for deactivate selected filter level
- value: Using for determinate filter values

If you understand this attributes, rest of operations too easy just put them properly in filter selector element.

**Examples for select(same on multiple select just put multiple attribute on select tag):**

    <select class="filter" data-fbdeep="0">
	    <option data-fbflush="true" value="none">
		    Select
	    </option>
	    <option value="America">
		    America
	    </option>
	    <option value="Turkey">
		    Turkey
	    </option>
    </select>
    
    <select class="filter" data-fbdeep="1">
	    <option data-fbflush="true" value="none">
		    Select
	    </option>
	    <option value="InDoor">
		    InDoor
	    </option>
	    <option value="OutDoor">
		    OutDoor
	    </option>
    </select>


**Example for checkbox(same on radio just change type attribute to radio):**

    <input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="none" data-fbflush="true"/>None
    
    <input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="America"/>America
    
    <input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="Turkey"/>Turkey
    
    <br/>
    
    <br/>
    
    <input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="none" data-fbflush="true" />None
    
    <input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="InDoor"/>InDoor
    
    <input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="OutDoor"/>OutDoor

**Example for buttons:**

    <button class="filter btn btn-primary" data-fbdeep="0" data-fbflush="true" value="none">None</button>
    
    <button class="filter btn btn-primary" data-fbdeep="0" value="America">America</button>
    
    <button class="filter btn btn-primary" data-fbdeep="0" name="filter1" value="Turkey">Turkey</button>
    
    <br/>
    
    <br/>
    
    <button class="filter btn btn-primary" data-fbdeep="1" data-fbflush="true" value="none">None</button>
    
    <button class="filter btn btn-primary" data-fbdeep="1" value="InDoor">InDoor</button>
    
    <button class="filter btn btn-primary" data-fbdeep="1" value="OutDoor">OutDoor</button>


**Example for a tag:**

    <a href="#" class="filter btn btn-primary" data-fbdeep="0" data-fbflush="true" value="none">None</a>
    
    <a href="#" class="filter btn btn-primary" data-fbdeep="0" value="America">America</a>
    
    <a href="#" class="filter btn btn-primary" data-fbdeep="0" value="Canada">Canada</a>
    
    <br/>
    
    <br/>
    
    <a href="#" class="filter btn btn-primary" data-fbdeep="1" data-fbflush="true" value="none">None</a>
    
    <a href="#" class="filter btn btn-primary" data-fbdeep="1" value="InDoor">InDoor</a>
    
    <a href="#" class="filter btn btn-primary" data-fbdeep="1" value="OutDoor">OutDoor</a>

After creation of filter selector put jQuery and Filterbucks.js top of the page. 
And write these between script tags

    <script>
	    jQuery(document).ready(function(){
		    $(".filter1").filterbucks();
	    });
    </script>
That's it ! 

## **Properties**

If you want to start you should learn some important property for filterbucks plugin.

> **data-fbdeep**

data-fbdeep property using for determinate filter level of selected filter value. Queries (hierarchical or multiple) creating using this element.
This element value should be numeric and value range can be 0 to n.
0 value for greatest filter level(or more general level), n value for lowest filter level(or more specific level).

> **data-fbflush**

This property looking filter element level and deactivate this level. This element value can be true or false. If you are using true, selected filter element level will be deactivate.

> **Other important notes.**

Every filter element should include this attributes inside options or inside element itself. 

 - data-fbdeep: For choose value filter level
 - value: Using for determinate filter values

Optional Parameters:
 - data-fbflush: This attribute using for deactivate selected filter level




