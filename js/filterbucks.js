(function (jQuery$1) {
  'use strict';

  jQuery$1 = jQuery$1 && Object.prototype.hasOwnProperty.call(jQuery$1, 'default') ? jQuery$1['default'] : jQuery$1;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var BaseConfiguration = function BaseConfiguration(Parents, ExtraConfiguration) {
    _classCallCheck(this, BaseConfiguration);

    this.Parents = Parents;
    this.ExtraConfiguration = ExtraConfiguration;
    this.BaseClass = ".filterbucks";
    this.DataDeepProp = "fbdeep";
    this.DataFlushProp = "fbflush";
    this.CheckSelector = ":checked";
    this.ButtonCheckSelector = "clicked";
    this.Event = "change";
    this.RelatedFilterShowClass = "filterbucksRelatedShow";
    this.RelatedFilterHideClass = "filterbucksRelatedHide";
    this.FilterShowClass = "filterbucksFilteredShow";
    this.FilterHideClass = "filterbucksFilteredHide";
    this.FilterTargetElementClass = "filterbucksSelected";
    this.FilterStartEvent = "filterbucks-start";
    this.FilterEndEvent = "filterbucks-end";
    this.DefaultSelection = '[data-selected="true"]';
    this.ExtraConfig = ExtraConfiguration;
    this.Type = jQuery$1(Parents).get(0).tagName == "INPUT" ? jQuery$1(Parents).prop("type").toLowerCase() : jQuery$1(Parents).get(0).tagName.toLowerCase();

    if (this.Type === "button" || this.Type === "a") {
      this.Event = "click";
      this.CheckSelector = "[clicked]";
    }

    if (this.Type === "select") {
      this.CheckSelector = "option:selected";
    }

    if (this.Type === "radio" || this.Type === "checkbox") {
      this.CheckSelector = ":checked";
    }
  };

  var FilterbucksEvents = /*#__PURE__*/function () {
    function FilterbucksEvents(Configuration, FocusedItem) {
      _classCallCheck(this, FilterbucksEvents);

      this.Configuration = Configuration;
      this.FocusedItem = FocusedItem;
    }

    _createClass(FilterbucksEvents, [{
      key: "FilterbucksStartEvent",
      value: function FilterbucksStartEvent() {
        jQuery$1(this.Configuration.Parents).trigger(this.Configuration.FilterStartEvent, this.FocusedItem);
      }
    }, {
      key: "FilterbucksEndEvent",
      value: function FilterbucksEndEvent() {
        jQuery$1(this.Configuration.Parents).trigger(this.Configuration.FilterEndEvent, this.FocusedItem);
      }
    }]);

    return FilterbucksEvents;
  }();

  var ExtraConfigurationChecker = /*#__PURE__*/function () {
    function ExtraConfigurationChecker(Configuration) {
      _classCallCheck(this, ExtraConfigurationChecker);

      this.Configuration = Configuration;
    }

    _createClass(ExtraConfigurationChecker, [{
      key: "HasButtonCssOpacity",
      value: function HasButtonCssOpacity() {
        if (this.Configuration.ExtraConfiguration && this.Configuration.ExtraConfiguration.ButtonCssOpacity && this.Configuration.ExtraConfiguration.ButtonCssOpacity === true) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "HasHideUnrelateds",
      value: function HasHideUnrelateds() {
        if (this.Configuration.ExtraConfiguration && this.Configuration.ExtraConfiguration.HideUnrelateds && this.Configuration.ExtraConfiguration.HideUnrelateds === true) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "HasBtnSingleChoise",
      value: function HasBtnSingleChoise() {
        if (this.Configuration.ExtraConfiguration && this.Configuration.ExtraConfiguration.BtnSingleChoise && this.Configuration.ExtraConfiguration.BtnSingleChoise === true) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "HasFlushProp",
      value: function HasFlushProp(Item) {
        if (jQuery$1(Item).attr("data-" + this.Configuration.DataFlushProp) && jQuery$1(Item).attr("data-" + this.Configuration.DataFlushProp) === "true") {
          return true;
        } else {
          return false;
        }
      }
    }]);

    return ExtraConfigurationChecker;
  }();

  var ButtonSelector = /*#__PURE__*/function () {
    function ButtonSelector(Configuration, FocusedItem) {
      _classCallCheck(this, ButtonSelector);

      this.Configuration = Configuration;
      this.FocusedItem = FocusedItem;
      this.Checker = new ExtraConfigurationChecker(Configuration);
    }

    _createClass(ButtonSelector, [{
      key: "ButtonSelectorAdd",
      value: function ButtonSelectorAdd(FocusThis) {
        var FocusDecided;

        if (FocusThis !== undefined) {
          FocusDecided = FocusThis;
        } else {
          FocusDecided = this.FocusedItem;
        }

        jQuery$1(FocusDecided).attr(this.Configuration.ButtonCheckSelector, "");
        jQuery$1(FocusDecided).addClass(this.Configuration.FilterTargetElementClass);

        if (this.Checker.HasButtonCssOpacity()) {
          jQuery$1(FocusDecided).css("opacity", "0.5");
        }
      }
    }, {
      key: "ButtonSelectorRemove",
      value: function ButtonSelectorRemove(FocusThis) {
        var FocusDecided;

        if (FocusThis !== undefined) {
          FocusDecided = FocusThis;
        } else {
          FocusDecided = this.FocusedItem;
        }

        jQuery$1(FocusDecided).removeAttr(this.Configuration.ButtonCheckSelector);
        jQuery$1(FocusDecided).removeClass(this.Configuration.FilterTargetElementClass);

        if (this.Checker.HasButtonCssOpacity()) {
          jQuery$1(FocusDecided).css("opacity", "1");
        }
      }
    }]);

    return ButtonSelector;
  }();

  var FilterbucksElementInitializers = /*#__PURE__*/function () {
    function FilterbucksElementInitializers(Configuration, FocusedItem) {
      _classCallCheck(this, FilterbucksElementInitializers);

      this.Configuration = Configuration;
      this.FocusedItem = FocusedItem;
      this.Checker = new ExtraConfigurationChecker(Configuration);
      this.SpecialSelector = new ButtonSelector(Configuration, FocusedItem);
    }

    _createClass(FilterbucksElementInitializers, [{
      key: "InitializeElement",
      value: function InitializeElement() {
        if (this.Configuration.Type == "button" || this.Configuration.Type == "a") {
          this.ButtonInitializer();
        } else {
          this.FormElementInitializer();
        }
      }
    }, {
      key: "InitializeQuery",
      value: function InitializeQuery(Query) {
        jQuery$1(this.Configuration.BaseClass).css("display", "none");
        jQuery$1(this.Configuration.BaseClass).removeClass(this.Configuration.FilterShowClass);
        jQuery$1(this.Configuration.BaseClass).removeClass(this.Configuration.FilterHideClass);
        jQuery$1(this.Configuration.BaseClass).addClass(this.Configuration.FilterHideClass);
        jQuery$1(Query).css("display", "");
        jQuery$1(Query).removeClass(this.Configuration.FilterHideClass);
        jQuery$1(Query).addClass(this.Configuration.FilterShowClass);
      }
    }, {
      key: "ButtonInitializer",
      value: function ButtonInitializer() {
        if (this.Checker.HasBtnSingleChoise()) {
          var SelectedDeepCount = jQuery$1(this.FocusedItem).data(this.Configuration.DataDeepProp);
          var AlreadySelectedBtn = jQuery$1(this.Configuration.Parents).filter("[" + this.Configuration.ButtonCheckSelector + "]").filter('[data-' + this.Configuration.DataDeepProp + ' = "' + SelectedDeepCount + '"]');

          if (AlreadySelectedBtn.length == 1) {
            this.SpecialSelector.ButtonSelectorRemove(AlreadySelectedBtn);
            this.SpecialSelector.ButtonSelectorAdd();
          } else if (AlreadySelectedBtn.length < 1) {
            this.SpecialSelector.ButtonSelectorAdd();
          }
        } else {
          if (jQuery$1(this.FocusedItem).is("[" + this.Configuration.ButtonCheckSelector + "]")) {
            this.SpecialSelector.ButtonSelectorRemove();
          } else {
            this.SpecialSelector.ButtonSelectorAdd();
          }
        }
      }
    }, {
      key: "FormElementInitializer",
      value: function FormElementInitializer() {
        jQuery$1(this.Configuration.Parents).removeClass(this.Configuration.FilterTargetElementClass);
        jQuery$1(this.FocusedItem).addClass(this.Configuration.FilterTargetElementClass);
      }
    }]);

    return FilterbucksElementInitializers;
  }();

  var DeepCounter = /*#__PURE__*/function () {
    function DeepCounter(Configuration) {
      _classCallCheck(this, DeepCounter);

      this.Configuration = Configuration;
    }

    _createClass(DeepCounter, [{
      key: "SelectedElementsDeeps",
      value: function SelectedElementsDeeps() {
        var FindedDeeps = [];
        var OurConfiguration = this.Configuration;
        jQuery$1(OurConfiguration.Parents).each(function () {
          if (OurConfiguration.Type == "select") {
            var DetectCheckSelector = $(this).find(OurConfiguration.CheckSelector);

            if (DetectCheckSelector.length > 0) {
              FindedDeeps.push(parseInt(jQuery$1(this).data(OurConfiguration.DataDeepProp), 10));
            }
          } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
            var _DetectCheckSelector = $(this).filter(OurConfiguration.CheckSelector);

            if (_DetectCheckSelector.length > 0) {
              FindedDeeps.push(parseInt(jQuery$1(this).data(OurConfiguration.DataDeepProp), 10));
            }
          }
        });
        var UniqueDeeps = FindedDeeps.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        UniqueDeeps = UniqueDeeps.sort(function (a, b) {
          return a - b;
        });
        return UniqueDeeps;
      }
    }, {
      key: "AllElementsDeep",
      value: function AllElementsDeep() {
        var FindedDeeps = [];
        var OurConfiguration = this.Configuration;
        jQuery$1(OurConfiguration.Parents).each(function () {
          if (OurConfiguration.Type == "select") {
            FindedDeeps.push(parseInt(jQuery$1(this).data(OurConfiguration.DataDeepProp), 10));
          } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
            FindedDeeps.push(parseInt(jQuery$1(this).data(OurConfiguration.DataDeepProp), 10));
          }
        });
        var uniqueDeeps = FindedDeeps.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        uniqueDeeps = uniqueDeeps.sort(function (a, b) {
          return a - b;
        });
        return uniqueDeeps;
      }
    }]);

    return DeepCounter;
  }();

  var Flusher = /*#__PURE__*/function () {
    function Flusher(Configuration, SelectedDeeps, FocusedItem) {
      _classCallCheck(this, Flusher);

      this.Configuration = Configuration;
      this.SelectedDeeps = SelectedDeeps;
      this.FocusedItem = FocusedItem;
      this.Checker = new ExtraConfigurationChecker(Configuration);
    }

    _createClass(Flusher, [{
      key: "Flush",
      value: function Flush() {
        var DeepCount = parseInt(jQuery$1(this.FocusedItem).data(this.Configuration.DataDeepProp), 10);
        var RealDeepCount = parseInt(jQuery$1(this.FocusedItem).data(this.Configuration.DataDeepProp), 10);

        if (this.Checker.HasFlushProp(this.FocusedItem)) {
          DeepCount--;
        }

        var OurConfiguration = this.Configuration;
        var OurChecker = this.Checker;
        this.SelectedDeeps.forEach(function (ThisDeep) {
          if (DeepCount < ThisDeep) {
            var FlushThis = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + ThisDeep + "']");

            if (OurConfiguration.Type == "select") {
              jQuery$1(FlushThis).find("option").each(function () {
                if (OurChecker.HasFlushProp(this)) {
                  jQuery$1(FlushThis).val(jQuery$1(this).val());
                }
              });
            } else if (OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
              jQuery$1(FlushThis).each(function () {
                var SpeacialBtnSelector = new ButtonSelector(OurConfiguration, this);

                if (OurChecker.HasFlushProp(this) && RealDeepCount !== ThisDeep) {
                  SpeacialBtnSelector.ButtonSelectorAdd();
                }

                if (!OurChecker.HasFlushProp(this)) {
                  SpeacialBtnSelector.ButtonSelectorRemove();
                }
              });
            } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox") {
              jQuery$1(FlushThis).each(function () {
                if (OurChecker.HasFlushProp(this) && RealDeepCount !== ThisDeep) {
                  jQuery$1(this).prop("checked", true);
                }

                if (!OurChecker.HasFlushProp(this)) {
                  jQuery$1(this).prop("checked", false);
                }
              });
            }
          }
        });
      }
    }]);

    return Flusher;
  }();

  var DeepElementSelector = /*#__PURE__*/function () {
    function DeepElementSelector(Configuration, UniqueDeeps) {
      _classCallCheck(this, DeepElementSelector);

      this.Configuration = Configuration;
      this.UniqueDeeps = UniqueDeeps;
    }

    _createClass(DeepElementSelector, [{
      key: "GetDeepElements",
      value: function GetDeepElements() {
        var DeepElements = [];
        var OurConfiguration = this.Configuration;
        this.UniqueDeeps.forEach(function (deep) {
          var FindedDeep;

          if (OurConfiguration.Type == "select") {
            FindedDeep = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']").find(OurConfiguration.CheckSelector);
          } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
            FindedDeep = jQuery$1(OurConfiguration.Parents).filter(OurConfiguration.CheckSelector).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");
          }

          if (FindedDeep !== undefined && jQuery$1(FindedDeep).length > 0) {
            DeepElements.push(FindedDeep);
          }
        });
        return DeepElements;
      }
    }]);

    return DeepElementSelector;
  }();

  var QueryEngine = /*#__PURE__*/function () {
    function QueryEngine(Configuration) {
      _classCallCheck(this, QueryEngine);

      this.Configuration = Configuration;
    }

    _createClass(QueryEngine, [{
      key: "DeepQueryGenerator",
      value: function DeepQueryGenerator(DeepElements, Queries) {
        if (Queries === undefined) {
          Queries = [];
        }

        if (DeepElements.length === 0) {
          return Queries;
        }

        var CopyDeepElements = DeepElements.slice();
        var TakenLayer = CopyDeepElements.shift();
        var ExtendQueries = [];
        var DetectedNone = jQuery$1(TakenLayer).filter("[data-" + this.Configuration.DataFlushProp + "='true']");

        if (jQuery$1(DetectedNone).length <= 0) {
          jQuery$1(TakenLayer).each(function () {
            var element = this;

            if (Queries.length == 0) {
              var classValue = "." + jQuery$1(element).attr("value");
              ExtendQueries.push(classValue);
            } else if (Queries.length > 0) {
              Queries.forEach(function (query) {
                var classValue = "." + jQuery$1(element).attr("value");
                var newQuery = query + classValue;
                ExtendQueries.push(newQuery);
              });
            }
          });
        } else if (jQuery$1(DetectedNone).length > 0) {
          ExtendQueries = Queries;
        }

        return this.DeepQueryGenerator(CopyDeepElements, ExtendQueries);
      }
    }, {
      key: "CssQueryGenerator",
      value: function CssQueryGenerator(PossibleQueries) {
        var ClassQuery = "";

        if (PossibleQueries === null) {
          ClassQuery = this.Configuration.BaseClass;
        } else if (PossibleQueries.length <= 0) {
          ClassQuery = this.Configuration.BaseClass;
        } else if (PossibleQueries !== null && PossibleQueries.length > 0) {
          var OurConfiguration = this.Configuration;
          PossibleQueries.forEach(function (value) {
            ClassQuery += OurConfiguration.BaseClass + value + ",";
          });
          ClassQuery = ClassQuery.substring(0, ClassQuery.length - 1);
        }

        return ClassQuery;
      }
    }]);

    return QueryEngine;
  }();

  var FilterHiderInitializers = /*#__PURE__*/function () {
    function FilterHiderInitializers(Configuration) {
      _classCallCheck(this, FilterHiderInitializers);

      this.Configuration = Configuration;
      this.Checker = new ExtraConfigurationChecker(Configuration);
    }

    _createClass(FilterHiderInitializers, [{
      key: "RunHider",
      value: function RunHider(DeepElements, FocusedItem, AllDeeps, PossibleQueries) {
        if (this.Checker.HasHideUnrelateds()) {
          var OurConfiguration = this.Configuration;
          var OurChecker = this.Checker;
          var DeepCount = parseInt(jQuery$1(FocusedItem).data(OurConfiguration.DataDeepProp), 10);

          if (DeepCount != DeepElements.length) {
            var DiscoverThisDeep = DeepCount + 1;

            if (OurConfiguration.Type == "select") {
              var UnSortedDeep = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DiscoverThisDeep + "']");
              jQuery$1(UnSortedDeep).find("option").each(function () {
                jQuery$1(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                jQuery$1(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                jQuery$1(this).addClass(OurConfiguration.RelatedFilterShowClass);
                jQuery$1(this).show();
              });
              var SelectedElement = jQuery$1(FocusedItem).find(OurConfiguration.CheckSelector);

              if (!OurChecker.HasFlushProp(SelectedElement)) {
                jQuery$1(UnSortedDeep).find("option").each(function () {
                  if (!OurChecker.HasFlushProp(this)) {
                    var UnSelectedValue = jQuery$1(this).val();
                    var FindedAny = false;
                    PossibleQueries.forEach(function (value) {
                      var InvestgatorClass = OurConfiguration.BaseClass + value + "." + UnSelectedValue;
                      var CountOfSelector = jQuery$1(InvestgatorClass).length;

                      if (CountOfSelector > 0) {
                        FindedAny = true;
                      }
                    });

                    if (!FindedAny) {
                      jQuery$1(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                      jQuery$1(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                      jQuery$1(this).addClass(OurConfiguration.RelatedFilterHideClass);
                      jQuery$1(this).hide();
                    }

                    FindedAny = false;
                  }
                });
              }
            } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
              var unSortedDeep = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DiscoverThisDeep + "']");
              jQuery$1(unSortedDeep).each(function () {
                jQuery$1(this).show();
              });
              var SelectedItem;

              if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox") {
                SelectedItem = jQuery$1(FocusedItem);
              }

              if (OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                SelectedItem = jQuery$1(OurConfiguration.Parents).filter(OurConfiguration.CheckSelector).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DeepCount + "']");
              }

              if (!OurChecker.HasFlushProp(SelectedItem)) {
                jQuery$1(unSortedDeep).each(function () {
                  if (!OurChecker.HasFlushProp(this)) {
                    var UnSelectedValue;

                    if (OurConfiguration.Type === "a") {
                      UnSelectedValue = jQuery$1(this).attr("value");
                    } else {
                      UnSelectedValue = jQuery$1(this).val();
                    }

                    var FindedAny = false;
                    PossibleQueries.forEach(function (value) {
                      var InvestgatorClass = OurConfiguration.BaseClass + value + "." + UnSelectedValue;
                      var CountOfSelector = jQuery$1(InvestgatorClass).length;

                      if (CountOfSelector > 0) {
                        FindedAny = true;
                      }
                    });

                    if (!FindedAny && PossibleQueries.length > 0) {
                      jQuery$1(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                      jQuery$1(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                      jQuery$1(this).addClass(OurConfiguration.RelatedFilterHideClass);
                      jQuery$1(this).hide();
                    }

                    FindedAny = false;
                  }
                });
              }
            }
          }

          if (DeepElements.length <= 0) {
            AllDeeps.forEach(function (deep) {
              if (OurConfiguration.Type == "select") {
                var _UnSortedDeep = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");

                jQuery$1(_UnSortedDeep).find("option").each(function () {
                  jQuery$1(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                  jQuery$1(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                  jQuery$1(this).addClass(OurConfiguration.RelatedFilterShowClass);
                  jQuery$1(this).show();
                });
              } else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                var _UnSortedDeep2 = jQuery$1(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");

                jQuery$1(_UnSortedDeep2).each(function () {
                  jQuery$1(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                  jQuery$1(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                  jQuery$1(this).addClass(OurConfiguration.RelatedFilterShowClass);
                  jQuery$1(this).show();
                });
              }
            });
          }
        }
      }
    }]);

    return FilterHiderInitializers;
  }();

  var Engine = /*#__PURE__*/function () {
    function Engine() {
      _classCallCheck(this, Engine);
    }

    _createClass(Engine, [{
      key: "Run",
      value: function Run(Event) {
        var ForceToRun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var Configuration = Event.data;
        var FocusedItem = undefined;
        if (ForceToRun) FocusedItem = ForceToRun;else FocusedItem = this;
        var EventTriggers = new FilterbucksEvents(Configuration, FocusedItem);
        var Initializer = new FilterbucksElementInitializers(Configuration, FocusedItem);
        var Counter = new DeepCounter(Configuration);
        EventTriggers.FilterbucksStartEvent();
        Initializer.InitializeElement();
        var SelectedDeeps = Counter.SelectedElementsDeeps();
        var AllDeeps = Counter.AllElementsDeep();
        var FlushFilter = new Flusher(Configuration, SelectedDeeps, FocusedItem);

        if (Configuration.ExtraConfig && Configuration.ExtraConfig.DisableFlusher && Configuration.ExtraConfig.DisableFlusher === true) ; else if (Configuration.ExtraConfig && Configuration.ExtraConfig.DisableFlusher && Configuration.ExtraConfig.DisableFlusher === true) {
          FlushFilter.Flush();
        } else {
          FlushFilter.Flush();
        }

        var DeepSelector = new DeepElementSelector(Configuration, SelectedDeeps);
        var DeepElements = DeepSelector.GetDeepElements();
        var QueryGenerator = new QueryEngine(Configuration);
        var Hider = new FilterHiderInitializers(Configuration);
        var PossibleQueries = QueryGenerator.DeepQueryGenerator(DeepElements);
        Hider.RunHider(DeepElements, FocusedItem, AllDeeps, PossibleQueries);
        var ClassQuery = QueryGenerator.CssQueryGenerator(PossibleQueries);
        Initializer.InitializeQuery(ClassQuery);
        EventTriggers.FilterbucksEndEvent();
      }
    }, {
      key: "ForceRun",
      value: function ForceRun(base) {
        var engineBase = this;
        jQuery(base.DefaultSelection).each(function () {
          var event = {
            data: base
          };
          if (base.Type === "checkbox") jQuery(this).prop('checked', true);else if (base.Type === "select") {
            var upperEl = jQuery(this).prev();
            var valueOfElement = jQuery(this).attr('value');
            jQuery(upperEl).val(valueOfElement);
            engineBase.Run(event, upperEl);
            return;
          }
          engineBase.Run(event, this);
        });
      }
    }]);

    return Engine;
  }();

  jQuery$1.fn.filterbucks = function (ExtraConfiguration) {
    var base = new BaseConfiguration(this, ExtraConfiguration);

    if (base.Type === "button" || base.Type === "a") {
      base.Event = "mousedown";
      base.CheckSelector = "[clicked]";
    }

    if (base.Type === "select") {
      base.CheckSelector = "option:selected";
    }

    if (base.Type === "radio" || base.Type === "checkbox") {
      base.CheckSelector = ":checked";
    }

    var filterbucksEngine = new Engine();
    this.on(base.Event, base, filterbucksEngine.Run);

    if (ExtraConfiguration.ControlInitiazeSelection && ExtraConfiguration.ControlInitiazeSelection === true) {
      filterbucksEngine.ForceRun(base);
    }
  };

}(jQuery));
//# sourceMappingURL=filterbucks.js.map
