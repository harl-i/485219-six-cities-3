import {FavoritesCard} from '../favorites-card/favorires-card.tsx';
import {getFavoriteOffers} from '../../store/selectors.ts';
import {CardProps} from '../offer-card/offer-card-data.ts';
import {useAppSelector} from '../../store';

function groupByCity(cards: CardProps[]): Record<string, CardProps[]> {
  return cards.reduce<Record<string, CardProps[]>>((acc, card) => {
    const city = card.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(card);
    return acc;
  }, {});
}

function FavoritesList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const groupedByCity = groupByCity(favoriteOffers);
  const cities = Object.keys(groupedByCity);

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {groupedByCity[city].map((card) => (
              <FavoritesCard key={card.id} {...card} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoritesList };
