const loadAllItems = require('./loadAllItems.js');
var _ = require('lodash');

module.exports = function main(inputs) {
    let items = loadAllItems();
    let groupByItem = _.countBy(inputs);
    let total = 0;

    function printHeader() {
        return "***<没钱赚商店>购物清单***\n";
    }

    function printLine(barcode, count) {
        let info = _.find(items, function(obj) { return obj.barcode === barcode; });
        let subtotal = count * info.price;
        total += subtotal;
        return `名称：${info.name}，数量：${count}${info.unit}，单价：${info.price.toFixed(2)}(元)，小计：${subtotal.toFixed(2)}(元)\n`
    }

    function printTotal() {
        return `----------------------\n总计：${total.toFixed(2)}(元)\n**********************`
    }

    let message = printHeader();
    _.forIn(groupByItem, function(value, key) {
        message += printLine(key, value);
    });
    message += printTotal();

    return message;
};
