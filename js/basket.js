var basket = {};
$.getJSON('goods.json', function (data) {
    var goods = data;
    checkBasket();
    loadGoods();
    showBasket();

    function loadGoods() { //загружаем витрину товаров
        var out = '<h3>Витрина товаров</h3>';
        for (var key in data) {
            out += '<div class="single">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '" class="img">';
            out += '<button data-art="' + key + '" class="add-to-basket" >Купить </button>';
            out += '</div>';
        }
        $('#goods').html(out);
        $('.add-to-basket').on('click', addToBasket);
    }

    function addToBasket() {
        //добавление товара в корзину
        var articul = $(this).attr('data-art'); //берем артикул кнопки, которая нажимается
        if (basket[articul] != undefined) { //проверяем есть ли товар в корзине
            basket[articul]++; // если есть плюсуем еще
        } else {
            basket[articul] = 1; //если нет, то добавляем 
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        // console.log(articul);
        showBasket();
    }

    function showBasket() { //выводим сразу корзину покупок


        if ($.isEmptyObject(basket)) {
            $('#basket').html('Корзина пуста. Добавьте товар в корзину.');
        } else {
            var out = '<h3>Список товаров положенных в корзину</h3>';
            for (var key in basket) {
                out += '<div class="basket-single">';
                out += '<button class="delete" data-art="' + key + '">x</button> <br>';
                out += '<img src="' + goods[key].image + '" class="img">';
                out += goods[key].name;
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += basket[key];
                out += '<button class="minus" data-art="' + key + '">-</button> <br>';
                out += '<p>Итого сумма: ' + basket[key] * goods[key].cost + '</p>';
                //baset[key] -  кличество товара в локальном хранилище
                out += '</div>'
            }

        }

        $('#basket').html(out);
        $('.plus').on('click', addGoods);
        $('.minus').on('click', delGoods);
        $('.delete').on('click', remGoods);

    }

    function addGoods() {
        var p = $(this).attr('data-art');
        basket[p]++;
        saveLS();
        // console.log(basket[p]);
        showBasket();
    }

    function delGoods() {
        var d = $(this).attr('data-art');
        if (basket[d] > 1) {
            basket[d]--;
        } else {
            delete basket[d];
        }
        saveLS();
        showBasket();
    }

    function remGoods() {
        var r = $(this).attr('data-art');
        delete basket[r];
        saveLS();
        showBasket();
    }

});

function checkBasket() {
    //проверка наличие корзины в локальном хранилище
    if (localStorage.getItem('basket') != null) {
        basket = JSON.parse(localStorage.getItem('basket'));
    }
    // console.log(basket);
}

function saveLS() {
    localStorage.setItem('basket', JSON.stringify(basket));
}