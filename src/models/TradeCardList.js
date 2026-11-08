export function TradeCardList(initialList = []) {
    this.items = initialList ?? [];

    this.setItems = function (newList) {
        this.items = newList;
    }

    this.add = function (tradeCard) {
        if(this.items.length > 0) {
            const lastTradeCard = this.items.at(-1);
            tradeCard.id = lastTradeCard ? lastTradeCard.id + 1 : 1;
            this.items.push(tradeCard);
        } else {
            tradeCard.id = 1;
            this.items.push(tradeCard);
        }
    }
    this.remove = function (tradeCard) {
        this.items = this.items.filter(card => card.id !== tradeCard.id);
    }
}