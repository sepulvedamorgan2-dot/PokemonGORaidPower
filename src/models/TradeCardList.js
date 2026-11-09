/**
 * TradeCardList is a collection of TradeCard objects.
 * It provides methods to manage the list of trade cards,
 * including adding and removing trade cards.
 * @param initialList an array of TradeCard's
 * @constructor
 */

export function TradeCardList(initialList = []) {
    this.items = initialList ?? [];

    this.setItems = function (newList) {
        this.items = newList;
    }

    /**
     * If Tradecard has Id, it adds the TradeCard to the list.
     * If the TradeCard does not have an ID,
     * it assigns a new ID based on the last TradeCard in the list and then adds it.
     * @param tradeCard full TradeCard object to add to the list
     */
    this.add = function (tradeCard) {
        if(tradeCard?.id !== null) {
            this.items.push(tradeCard);
            return;
        }
        if(this.items.length > 0) {
            const lastTradeCard = this.items.at(-1);
            tradeCard.id = lastTradeCard ? lastTradeCard.id + 1 : 1;
            this.items.push(tradeCard);
        } else {
            tradeCard.id = 1;
            this.items.push(tradeCard);
        }
    }
    /**
     * Removes a TradeCard from the list by its ID.
     * @param tradeCard pass full object to delete
     */
    this.remove = function (tradeCard) {
        this.items = this.items.filter(card => card.id !== tradeCard.id);
    }
}