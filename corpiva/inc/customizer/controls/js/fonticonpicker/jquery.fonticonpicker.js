/**
 *  jQuery fontIconPicker - v2.0.0
 *
 *  An icon picker built on top of font icons and jQuery
 *
 *  http://codeb.it/fontIconPicker
 *
 *  Made by Alessandro Benoit & Swashata
 *  Under MIT License
 *
 * {@link https://github.com/micc83/fontIconPicker}
 */
!(function(a) {
    "use strict";

    function c(c, d) {
        (this.element = a(c)),
        (this.settings = a.extend({}, b, d)),
        this.settings.emptyIcon && this.settings.iconsPerPage--,
            (this.iconPicker = a("<div/>", {
                class: "icons-selector",
                style: "position: relative",
                html: '<div class="selector"><span class="selected-icon"><i class="fa-times-circle"></i></span><span class="selector-button"><i class="fip-icon-down-dir"></i></span></div><div class="selector-popup" style="display: none;">' +
                    (this.settings.hasSearch ? '<div class="selector-search"><input type="text" name="" value="" placeholder="Search icon" class="icons-search-input"/><i class="fip-icon-search"></i></div>' : "") +
                    '<div class="selector-category">' +
                    '<select name="" class="icon-category-select" style="display: none">' +
                    "</select>" +
                    "</div>" +
                    '<div class="fip-icons-container"></div>' +
                    '<div class="selector-footer" style="display:none;">' +
                    '<span class="selector-pages">1/2</span>' +
                    '<span class="selector-arrows">' +
                    '<span class="selector-arrow-left" style="display:none;">' +
                    '<i class="fip-icon-left-dir"></i>' +
                    "</span>" +
                    '<span class="selector-arrow-right">' +
                    '<i class="fip-icon-right-dir"></i>' +
                    "</span>" +
                    "</span>" +
                    "</div>" +
                    "</div>",
            })),
            (this.iconContainer = this.iconPicker.find(".fip-icons-container")),
            (this.searchIcon = this.iconPicker.find(".selector-search i")),
            (this.iconsSearched = []),
            (this.isSearch = !1),
            (this.totalPage = 1),
            (this.currentPage = 1),
            (this.currentIcon = !1),
            (this.iconsCount = 0),
            (this.open = !1),
            (this.searchValues = []),
            (this.availableCategoriesSearch = []),
            (this.triggerEvent = null),
            (this.backupSource = []),
            (this.backupSearch = []),
            (this.isCategorized = !1),
            (this.selectCategory = this.iconPicker.find(".icon-category-select")),
            (this.selectedCategory = !1),
            (this.availableCategories = []),
            (this.unCategorizedKey = null),
            this.init();
    }
    var b = {
        theme: "fip-grey",
        source: !1,
        emptyIcon: !0,
        emptyIconValue: "",
        iconsPerPage: 20,
        hasSearch: !0,
        searchSource: !1,
        useAttribute: !1,
        attributeName: "data-icon",
        convertToHex: !0,
        allCategoryText: "From all categories",
        unCategorizedText: "Uncategorized",
    };
    (c.prototype = {
        init: function() {
            this.iconPicker.addClass(this.settings.theme), this.iconPicker.css({
                left: -9999
            }).appendTo("body");
            var b = this.iconPicker.outerHeight(),
                c = this.iconPicker.outerWidth();
            if (
                (this.iconPicker.css({
                        left: ""
                    }),
                    this.element.before(this.iconPicker),
                    this.element.css({
                        visibility: "hidden",
                        top: 0,
                        position: "relative",
                        zIndex: "-1",
                        left: "-" + c + "px",
                        display: "inline-block",
                        height: b + "px",
                        width: c + "px",
                        padding: "0",
                        margin: "0 -" + c + "px 0 0",
                        border: "0 none",
                        verticalAlign: "top",
                    }), !this.element.is("select"))
            ) {
                var d = (function() {
                        for (var a = 3, b = document.createElement("div"), c = b.all || [];
                            (b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->"), c[0];);
                        return a > 4 ? a : !a;
                    })(),
                    e = document.createElement("div");
                this.triggerEvent = 9 !== d && "oninput" in e ? ["input", "keyup"] : ["keyup"];
            }!this.settings.source && this.element.is("select") ?
                ((this.settings.source = []),
                    (this.settings.searchSource = []),
                    this.element.find("optgroup").length ?
                    ((this.isCategorized = !0),
                        this.element.find("optgroup").each(
                            a.proxy(function(b, c) {
                                var d = this.availableCategories.length,
                                    e = a("<option />");
                                e.attr("value", d),
                                    e.html(a(c).attr("label")),
                                    this.selectCategory.append(e),
                                    (this.availableCategories[d] = []),
                                    (this.availableCategoriesSearch[d] = []),
                                    a(c)
                                    .find("option")
                                    .each(
                                        a.proxy(function(b, c) {
                                            var e = a(c).val(),
                                                f = a(c).html();
                                            e && e !== this.settings.emptyIconValue && (this.settings.source.push(e), this.availableCategories[d].push(e), this.searchValues.push(f), this.availableCategoriesSearch[d].push(f));
                                        }, this)
                                    );
                            }, this)
                        ),
                        this.element.find("> option").length &&
                        this.element.find("> option").each(
                            a.proxy(function(b, c) {
                                var d = a(c).val(),
                                    e = a(c).html();
                                return d && "" !== d && d != this.settings.emptyIconValue ?
                                    (null === this.unCategorizedKey &&
                                        ((this.unCategorizedKey = this.availableCategories.length),
                                            (this.availableCategories[this.unCategorizedKey] = []),
                                            (this.availableCategoriesSearch[this.unCategorizedKey] = []),
                                            a("<option />").attr("value", this.unCategorizedKey).html(this.settings.unCategorizedText).appendTo(this.selectCategory)),
                                        this.settings.source.push(d),
                                        this.availableCategories[this.unCategorizedKey].push(d),
                                        this.searchValues.push(e),
                                        this.availableCategoriesSearch[this.unCategorizedKey].push(e),
                                        void 0) :
                                    !0;
                            }, this)
                        )) :
                    this.element.find("option").each(
                        a.proxy(function(b, c) {
                            var d = a(c).val(),
                                e = a(c).html();
                            d && (this.settings.source.push(d), this.searchValues.push(e));
                        }, this)
                    ),
                    (this.backupSource = this.settings.source.slice(0)),
                    (this.backupSearch = this.searchValues.slice(0)),
                    this.loadCategories()) :
                this.initSourceIndex(),
                this.loadIcons(),
                this.selectCategory.on(
                    "change keyup",
                    a.proxy(function(b) {
                        if (this.isCategorized === !1) return !1;
                        var c = a(b.currentTarget),
                            d = c.val();
                        if ("all" === c.val())(this.settings.source = this.backupSource), (this.searchValues = this.backupSearch);
                        else {
                            var e = parseInt(d, 10);
                            this.availableCategories[e] && ((this.settings.source = this.availableCategories[e]), (this.searchValues = this.availableCategoriesSearch[e]));
                        }
                        this.resetSearch(), this.loadIcons();
                    }, this)
                ),
                this.iconPicker.find(".selector-button").click(
                    a.proxy(function() {
                        this.toggleIconSelector();
                    }, this)
                ),
                this.iconPicker.find(".selector-arrow-right").click(
                    a.proxy(function(b) {
                        this.currentPage < this.totalPage && (this.iconPicker.find(".selector-arrow-left").show(), (this.currentPage = this.currentPage + 1), this.renderIconContainer()),
                            this.currentPage === this.totalPage && a(b.currentTarget).hide();
                    }, this)
                ),
                this.iconPicker.find(".selector-arrow-left").click(
                    a.proxy(function(b) {
                        this.currentPage > 1 && (this.iconPicker.find(".selector-arrow-right").show(), (this.currentPage = this.currentPage - 1), this.renderIconContainer()), 1 === this.currentPage && a(b.currentTarget).hide();
                    }, this)
                ),
                this.iconPicker.find(".icons-search-input").keyup(
                    a.proxy(function(b) {
                        var c = a(b.currentTarget).val();
                        return "" === c ?
                            (this.resetSearch(), void 0) :
                            (this.searchIcon.removeClass("fip-icon-search"),
                                this.searchIcon.addClass("fip-icon-cancel"),
                                (this.isSearch = !0),
                                (this.currentPage = 1),
                                (this.iconsSearched = []),
                                a.grep(
                                    this.searchValues,
                                    a.proxy(function(a, b) {
                                        return a.toLowerCase().search(c.toLowerCase()) >= 0 ? ((this.iconsSearched[this.iconsSearched.length] = this.settings.source[b]), !0) : void 0;
                                    }, this)
                                ),
                                this.renderIconContainer(),
                                void 0);
                    }, this)
                ),
                this.iconPicker.find(".selector-search").on(
                    "click",
                    ".fip-icon-cancel",
                    a.proxy(function() {
                        this.iconPicker.find(".icons-search-input").focus(), this.resetSearch();
                    }, this)
                ),
                this.iconContainer.on(
                    "click",
                    ".fip-box",
                    a.proxy(function(b) {
                        this.setSelectedIcon(a(b.currentTarget).find("i").attr("data-fip-value")), this.toggleIconSelector();
                    }, this)
                ),
                this.iconPicker.click(function(a) {
                    return a.stopPropagation(), !1;
                }),
                a("html").click(
                    a.proxy(function() {
                        this.open && this.toggleIconSelector();
                    }, this)
                );
        },
        initSourceIndex: function() {
            if ("object" == typeof this.settings.source) {
                if (a.isArray(this.settings.source))
                    (this.isCategorized = !1),
                    this.selectCategory.html("").hide(),
                    (this.settings.source = a.map(this.settings.source, function(a) {
                        return "function" == typeof a.toString ? a.toString() : a;
                    })),
                    (this.searchValues = a.isArray(this.settings.searchSource) ?
                        a.map(this.settings.searchSource, function(a) {
                            return "function" == typeof a.toString ? a.toString() : a;
                        }) :
                        this.settings.source.slice(0));
                else {
                    var b = a.extend(!0, {}, this.settings.source);
                    (this.settings.source = []),
                    (this.searchValues = []),
                    (this.availableCategoriesSearch = []),
                    (this.selectedCategory = !1),
                    (this.availableCategories = []),
                    (this.unCategorizedKey = null),
                    (this.isCategorized = !0),
                    this.selectCategory.html("");
                    for (var c in b) {
                        var d = this.availableCategories.length,
                            e = a("<option />");
                        e.attr("value", d), e.html(c), this.selectCategory.append(e), (this.availableCategories[d] = []), (this.availableCategoriesSearch[d] = []);
                        for (var f in b[c]) {
                            var g = b[c][f],
                                h = this.settings.searchSource && this.settings.searchSource[c] && this.settings.searchSource[c][f] ? this.settings.searchSource[c][f] : g;
                            "function" == typeof g.toString && (g = g.toString()),
                                g && g !== this.settings.emptyIconValue && (this.settings.source.push(g), this.availableCategories[d].push(g), this.searchValues.push(h), this.availableCategoriesSearch[d].push(h));
                        }
                    }
                }
                (this.backupSource = this.settings.source.slice(0)), (this.backupSearch = this.searchValues.slice(0)), this.loadCategories();
            }
        },
        loadCategories: function() {
            this.isCategorized !== !1 && (a('<option value="all">' + this.settings.allCategoryText + "</option>").prependTo(this.selectCategory), this.selectCategory.show().val("all").trigger("change"));
        },
        loadIcons: function() {
            this.iconContainer.html('<i class="fip-icon-spin3 animate-spin loading"></i>'), this.settings.source instanceof Array && this.renderIconContainer();
        },
        renderIconContainer: function() {
            var b,
                c = [];
            if (
                ((c = this.isSearch ? this.iconsSearched : this.settings.source),
                    (this.iconsCount = c.length),
                    (this.totalPage = Math.ceil(this.iconsCount / this.settings.iconsPerPage)),
                    this.totalPage > 1 ? this.iconPicker.find(".selector-footer").show() : this.iconPicker.find(".selector-footer").hide(),
                    this.iconPicker.find(".selector-pages").html(this.currentPage + "/" + this.totalPage + " <em>(" + this.iconsCount + ")</em>"),
                    (b = (this.currentPage - 1) * this.settings.iconsPerPage),
                    this.settings.emptyIcon)
            )
                this.iconContainer.html('<span class="fip-box"><i class="fas fa-times-circle" data-fip-value="fa-times-circle"></i></span>');
            else {
                if (c.length < 1) return this.iconContainer.html('<span class="icons-picker-error"><i class="fas fa-times-circle" data-fip-value="fa-times-circle"></i></span>'), void 0;
                this.iconContainer.html("");
            }
            c = c.slice(b, b + this.settings.iconsPerPage);
            for (var e, d = 0;
                (e = c[d++]);) {
                var f = e;
                a.grep(
                        this.settings.source,
                        a.proxy(function(a, b) {
                            return a === e ? ((f = this.searchValues[b]), !0) : !1;
                        }, this)
                    ),
                    a("<span/>", {
                        html: '<i data-fip-value="' +
                            e +
                            '" ' +
                            (this.settings.useAttribute ? this.settings.attributeName + '="' + (this.settings.convertToHex ? "&#x" + parseInt(e, 10).toString(16) + ";" : e) + '"' : 'class=" ' + e + '"') +
                            "></i>",
                        class: "fip-box",
                        title: f,
                    }).appendTo(this.iconContainer);
            }
            this.settings.emptyIcon || (this.element.val() && -1 !== a.inArray(this.element.val(), this.settings.source)) ?
                -1 === a.inArray(this.element.val(), this.settings.source) ?
                this.setSelectedIcon() :
                this.setSelectedIcon(this.element.val()) :
                this.setSelectedIcon(c[0]);
        },
        setHighlightedIcon: function() {
            this.iconContainer.find(".current-icon").removeClass("current-icon"),
                this.currentIcon &&
                this.iconContainer
                .find('[data-fip-value="' + this.currentIcon + '"]')
                .parent("span")
                .addClass("current-icon");
        },
        setSelectedIcon: function(a) {
            if (
                ("fa-times-circle" === a && (a = ""),
                    this.settings.useAttribute ?
                    a ?
                    this.iconPicker.find(".selected-icon").html("<i " + this.settings.attributeName + '="' + (this.settings.convertToHex ? "&#x" + parseInt(a, 10).toString(16) + ";" : a) + '"></i>') :
                    this.iconPicker.find(".selected-icon").html('<i class="fa-times-circle"></i>') :
                    this.iconPicker.find(".selected-icon").html('<i class="fas ' + (a || "fa-times-circle") + '"></i>'),
                    this.element.val("" === a ? this.settings.emptyIconValue : a).trigger("change"),
                    null !== this.triggerEvent)
            )
                for (var b in this.triggerEvent) this.element.trigger(this.triggerEvent[b]);
            (this.currentIcon = a), this.setHighlightedIcon();
        },
        toggleIconSelector: function() {
            (this.open = this.open ? 0 : 1),
            this.iconPicker.find(".selector-popup").slideToggle(300),
                this.iconPicker.find(".selector-button i").toggleClass("fip-icon-down-dir"),
                this.iconPicker.find(".selector-button i").toggleClass("fip-icon-up-dir"),
                this.open && this.iconPicker.find(".icons-search-input").focus().select();
        },
        resetSearch: function() {
            this.iconPicker.find(".icons-search-input").val(""),
                this.searchIcon.removeClass("fip-icon-cancel"),
                this.searchIcon.addClass("fip-icon-search"),
                this.iconPicker.find(".selector-arrow-left").hide(),
                (this.currentPage = 1),
                (this.isSearch = !1),
                this.renderIconContainer(),
                this.totalPage > 1 && this.iconPicker.find(".selector-arrow-right").show();
        },
    }),
    (a.fn.fontIconPicker = function(b) {
        return (
            this.each(function() {
                a.data(this, "fontIconPicker") || a.data(this, "fontIconPicker", new c(this, b));
            }),
            (this.setIcons = a.proxy(function(b, c) {
                void 0 === b && (b = !1),
                    void 0 === c && (c = !1),
                    this.each(function() {
                        (a.data(this, "fontIconPicker").settings.source = b),
                        (a.data(this, "fontIconPicker").settings.searchSource = c),
                        a.data(this, "fontIconPicker").initSourceIndex(),
                            a.data(this, "fontIconPicker").resetSearch(),
                            a.data(this, "fontIconPicker").loadIcons();
                    });
            }, this)),
            (this.destroyPicker = a.proxy(function() {
                this.each(function() {
                    a.data(this, "fontIconPicker") &&
                        (a.data(this, "fontIconPicker").iconPicker.remove(),
                            a.data(this, "fontIconPicker").element.css({
                                visibility: "",
                                top: "",
                                position: "",
                                zIndex: "",
                                left: "",
                                display: "",
                                height: "",
                                width: "",
                                padding: "",
                                margin: "",
                                border: "",
                                verticalAlign: ""
                            }),
                            a.removeData(this, "fontIconPicker"));
                });
            }, this)),
            (this.refreshPicker = a.proxy(function(d) {
                d || (d = b),
                    this.destroyPicker(),
                    this.each(function() {
                        a.data(this, "fontIconPicker") || a.data(this, "fontIconPicker", new c(this, d));
                    });
            }, this)),
            this
        );
    });
})(jQuery);