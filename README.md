
![enter image description here](https://i.ibb.co/hc5cX6w/filterbucks-logo-fw.png"FileterbucksLogo")

  

## **Filterbucks**

  

Filterbucks is JQuery plugin which blazingly fast for filter operations based on using class selectors.

  

Filterbucks working with many Html elements with include hierarchical filter or multiple selection filter. You can use these elements for build filter selector.

- Select

- Radio

- Checkbox

- Button

- A

  

You can access filterbucks using:

  

npm install filterbucks

  

Or you can access directly by browser:

  

https://unpkg.com/filterbucks@1.x.x/filterbucks.min.js


  
  

## **How filterbucks working?**

  

Filterbucks working with html element's class attribute. You should put filter key values in class attribute and then build your filter element for choose filter, that's it, filterbucks handle the rest of operations.

  

## **How can I put filters on class attribute?**

  

This is easy peasy situation. For example you decide to filter videos by selection in your page. Take every video attribute or parent div etc, put class attribute that element, inside of class attribute first write "filterbucks" keyword, this will tell the plugin which elements filterable on page and then write your keyword for filters by using space.

For example:
```html
<div class="filterbucks Ford Speed">
<h1>Ford Speed</h1>
</div>

<div class="filterbucks Opel Comfort">
<h1>Opel Comfort</h1>
</div>
```

## **How can I build filter selector?**

  

This is quite easy too. Let me explain to you. Some data-* props for important for filterbucks plugin. **These are data-fbdeep,data-fbflush and value parameters in filter elements**. Let's tl;dr this props.

  

- data-fbdeep: For choose value filter level

- data-fbflush: This attribute using for deactivate selected filter level

- value: Using for determinate filter values

  

If you understand this attributes, rest of operations too easy just put them properly in filter selector element.

  

**Examples for select(same on multiple select just put multiple attribute on select tag):**
```html

<select class="filter" data-fbdeep="0">

<option data-fbflush="true" value="none">

Select

</option>

<option value="Ford">

Ford

</option>

<option value="Opel">

Opel

</option>

</select>

<select class="filter" data-fbdeep="1">

<option data-fbflush="true" value="none">

Select

</option>

<option value="Speed">

Speed

</option>

<option value="Comfort">

Comfort

</option>

</select>

```

**Example for checkbox(same on radio just change type attribute to radio):**

```html
<input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="none" data-fbflush="true"/>None

<input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="Ford"/>Ford

<input type="checkbox" class="filter" data-fbdeep="0" name="filter1" value="Opel"/>Opel

<br/>

<br/>

<input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="none" data-fbflush="true" />None

<input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="Speed"/>Speed

<input type="checkbox" class="filter" data-fbdeep="1" name="filter2" value="Comfort"/>Comfort
```


**Example for buttons:**

```html
<button class="filter btn btn-primary" data-fbdeep="0" data-fbflush="true" value="none">None</button>

<button class="filter btn btn-primary" data-fbdeep="0" value="Ford">Ford</button>

<button class="filter btn btn-primary" data-fbdeep="0" name="filter1" value="Opel">Opel</button>

<br/>

<br/>

<button class="filter btn btn-primary" data-fbdeep="1" data-fbflush="true" value="none">None</button>

<button class="filter btn btn-primary" data-fbdeep="1" value="Speed">Speed</button>

<button class="filter btn btn-primary" data-fbdeep="1" value="Comfort">Comfort</button>
```


**Example for a tag:**

```html
<a href="#" class="filter btn btn-primary" data-fbdeep="0" data-fbflush="true" value="none">None</a>

<a href="#" class="filter btn btn-primary" data-fbdeep="0" value="Ford">Ford</a>

<a href="#" class="filter btn btn-primary" data-fbdeep="0" value="Opel">Opel</a>

<br/>

<br/>

<a href="#" class="filter btn btn-primary" data-fbdeep="1" data-fbflush="true" value="none">None</a>

<a href="#" class="filter btn btn-primary" data-fbdeep="1" value="Speed">Speed</a>

<a href="#" class="filter btn btn-primary" data-fbdeep="1" value="Comfort">Comfort</a>

```

After creation of filter selector put jQuery and Filterbucks.js top of the page.

And write these between script tags

```html
<script>

jQuery(document).ready(function(){

$(".filter1").filterbucks();

});

</script>
```

That's it !

## How can i hide unrelated filter options when select option

Okey if you want hide unrelated filter based on your selection, this is so easy on filterbucks!

```javascript
jQuery(document).ready(function(){
	    $(".filter1").filterbucks({
		    HideUnrelateds:true
	    });
 });
```


Let me explain to you, You have Ford and Opel both of them Speed and Comfort model but somehow Ford have one more model, let's say that model name is Extreme. Opel definitely doesn't have this model, when we select Opel option, Model options filtered too and Extreme option will be deleted! When we select Ford again, Extreme option will come again.

## **Properties**

  

If you want to start you should learn some important property for filterbucks plugin.

  

>  **data-fbdeep**

  

data-fbdeep property using for determinate filter level of selected filter value. Queries (hierarchical or multiple) creating using this element.

This element value should be numeric and value range can be 0 to n.

0 value for greatest filter level(or more general level), n value for lowest filter level(or more specific level).

  

>  **data-fbflush**

  

This property looking filter element level and deactivate this level. This element value can be true or false. If you are using true, selected filter element level will be deactivate.

  

>  **Other important notes.**

  

Every filter element should include this attributes inside options or inside element itself.

  

- data-fbdeep: For choose value filter level

- value: Using for determinate filter values

  

Optional Parameters:

- data-fbflush: This attribute using for deactivate selected filter level


> **Somehow hide and show options maybe cannot be work cause of other css
> and javascript files.**

 **Filterbucks put some classes on hiding and showing elements.**

**On filtered Elements:**

 - filterbucksFilteredHide class added on hiding elements
 - filterbucksFilteredShow class added on showing elements

**On related filter elements:**

 - filterbuckRelatedHide class added on hiding elements
 - filterbuckRelatedShow class added on showing elements
