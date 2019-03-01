Game.shops = [];
Game.createShop = function(x,y){
	var items = [Game.getRandomItem(),Game.getRandomItem(),Game.getRandomItem(),Game.getRandomItem()];
	var price;
	Game.shops.push(new Game.GameObject(20,20,"green",x,y,"shop"));
	var shop = Game.shops[Game.shops.length - 1];
	shop.item1 = items[0];
	shop.setPrice(1,shop.item1.)
	shop.item2 = items[1];
	shop.item3 = items[2];
	shop.item4 = items[3];
}