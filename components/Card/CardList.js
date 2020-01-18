import { Card } from "semantic-ui-react";
function CardList({ cards }) {
  function mapCardsToItems(cards) {
    return cards.map(card => ({
      header: card.name,
      image: card.mediaUrl,
      meta: `$${card.price}`,
      color: "teal",
      fluid: true,
      childkey: card._id,
      href: `/card?_id=${card._id}`
    }));
  }
  return (
    <Card.Group
      stackable
      itemsPerRow="3"
      centered
      items={mapCardsToItems(cards)}
    />
  );
}

export default CardList;
