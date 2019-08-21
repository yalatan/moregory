(function($) {
    $(document).ready(function() {
        /* Табулятор */

        /* Для каждого табулятора на странице*/
        $('.lp-tabs').each(function() {
            /* Помещаем корневой div в переменную tabs */
            var tabs = $(this),
                tabsTitlesNames = []; /* А также объявляем массив, в котором будем хранить имена вкладок*/
            /*Сохраняем все имена вкладок в массив*/
            tabs.find('div[data-tab-title]').each(function() {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');
            /*Между корневым div и его содержимым добавляем div с классом "lp-tabs-content"*/
            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            /* В начало корневого div добавляем div с классом "lp-tabs-titles" и списком внутри*/
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');
            /* Помещаем в переменные:*/
            var tabsTitles = tabs.find('.lp-tabs-titles'),
                /* Div c заголовками вкладок*/
                tabsContent = tabs.find('.lp-tabs-content'),
                /* Div с содержимым вкладок*/
                tabsContentTabs = tabsContent.find('.lp-tab'); /* Набор вкладок*/
            /* Добавляем заголовки вкладок*/
            tabsTitlesNames.forEach(function(value) {
                tabsTitles.find('ul').append('<li><h5>' + value + '</h5></li>');
            });
            /* Помещаем в переменную набор заголовков вкладок*/
            var tabsTitlesItems = tabsTitles.find('ul li');
            /* Добавляем класс "active" первому заголовку*/
            /*  tabsTitlesItems.eq(0).addClass('active');*/
            /* Добавляем класс "active" первой вкладке и отображаем ее*/
            /*   tabsContentTabs.eq(0).addClass('active').show();*/
            /* Устанавливаем высоту div с содержимым вкладок равной высоте первой вкладки*/
            /*   tabsContent.height(tabsContent.find('.active').outerHeight());*/
            /* По клику на заголовке вкладки*/
            tabsTitlesItems.on('click', function() {
                console.log($(this).text());
                $(".main_navigation_last_li a").css({ 'color': '#47A1D4' });

                $(".nav_new_li").each(function() {
                    $(this).remove();
                });
                $(".main_navigation_last_li").after('<li class="nav_new_li">/</li><li class="nav_new_li">' + $(this).text() + '</li>');
                $("#payment_method_text_bottom").hide();
                $(this).addClass('active');
                tabsContentTabs.eq($(this).index()).addClass('active').show();
                tabsContent.height(tabsContent.find('.active').outerHeight());
                /* Проверяем, не находится ли табулятор в переходном состоянии*/
                if (!tabs.hasClass('changing')) {
                    /* Если нет, то добавляем класс "changing", обозначающий переходное состояние*/
                    tabs.addClass('changing');
                    /* Убираем класс "active" у активного заголовка*/
                    tabsTitlesItems.removeClass('active');
                    /* Добавляем класс "active" заголовку, по которому кликнули*/
                    $(this).addClass('active');
                    /* Помещаем в переменные:*/
                    var curTab = tabsContent.find('.active'),
                        /* Активную вкладку*/
                        nextTab = tabsContentTabs.eq($(this).index()); /* Следующую вкладку*/
                    /* Помещаем в переменную текущую высоту контента*/
                    var curHeight = curTab.outerHeight();
                    /* Отображаем следующую вкладку*/
                    nextTab.show();
                    /* Помещаем в переменную высоту контента следующей вкладки*/
                    var nextHeight = nextTab.outerHeight();
                    /* Прячем следующую вкладку, пока никто ее не увидел*/
                    nextTab.hide();
                    /* Если высота контента следующей вкладки больше*/
                    if (curHeight < nextHeight) {
                        /* То плавно увеличиваем высоту блока с контентом до нужной высоты*/
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    /* И параллельно прячем текщую вкладку*/
                    curTab.fadeOut(500, function() {
                        /* По окончании анимации*/
                        /* Если высота контента следующей вкладки меньше*/
                        if (curHeight > nextHeight) {
                            /* То плавно уменьшаем высоту блока с контентом до нужной высоты*/
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }
                        /* И параллельно отображаем следующую вкладку*/
                        nextTab.fadeIn(500, function() {
                            /* По окончании анимации*/
                            /* Удаляем класс "active" у текущей (уже прошлой) вкладки*/
                            curTab.removeClass('active');
                            /* Добавляем класс "active" следующей (уже текущей) вкладке*/
                            nextTab.addClass('active');
                            /* Выводим табулятор из переходного состояния*/
                            tabs.removeClass('changing');
                        });
                    });

                }
            });
            /* При изменении размера окна*/
            $(window).on('load resize', function() {
                /* Устанавливаем высоту div с содержимым вкладок равной высоте активной вкладки*/
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });
        });


        /* меню */
        $('.menu_open').on('click', function() {
            $('.navigation').show();
            /* $('.header_header').css("box-shadow", "none");*/
            $(this).hide();
            $('.menu_close').show();
            let height = $(document).outerHeight() + "px";
            $('.navigation').css("height", height);

            $(".navigation_item").on('click', function() {
                $(this).toggleClass("show");
            });

        });
        $('.menu_close').on('click', function() {
            $('.navigation').hide();
            /*   $('.header_header').css("box-shadow", "none");*/
            $(this).hide();
            $('.menu_open').show();
            $(".navigation_item").each(function() {
                $(this).removeClass("show");
            });
        });
        /*scroll page*/
        scroll_page.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        /**MAP */
        var myMap;
        ymaps.ready(init);

        function init() {
            var lpMapOptions1 = {
                center: [53.938623, 27.600566],
                zoom: 16,
                controls: ['fullscreenControl', 'zoomControl']
            };
            var lpPlacemark1 = new ymaps.Placemark(lpMapOptions1.center, {
                hintContent: 'ИТСПРО',
                balloonContentHeader: 'ИТСПРО',
                balloonContentBody: 'IT компания. Основное направление деятельности нашей компании – системная интеграция',
                balloonContentFooter: 'Минск, ул.Мележа, 25'
            });
            myMap = new ymaps.Map("map", lpMapOptions1);
            myMap.geoObjects.add(lpPlacemark1);
        }

    });
})(jQuery);