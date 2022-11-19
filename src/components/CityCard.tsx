import style from './CityCard.module.css';

export default function CityCard({
  item,
  cardDelate,
  editBoxID,
  editTemp,
  heddleTemp,
  passEditData,
  heddleEditTemp,
}) {
  function calculateTemp(temp, unit) {
    if (unit === 'C') {
      return 'temp :' + Math.floor(parseFloat(temp) + 273.15) + 'K';
    } else if (unit === 'F') {
      return 'temp :' + Math.floor(((parseFloat(temp) + 459.67) * 5) / 9) + 'K';
    } else {
      return 'temp :' + temp + 'K';
    }
  }

  return (
    <div key={item.id} className={style.cardBody}>
      <button
        className={style.delete}
        onClick={() => {
          cardDelate(item.id);
        }}>
        X
      </button>
      {editBoxID === item.id ? (
        <button className={style.edit} onClick={passEditData}>
          OK
        </button>
      ) : (
        <button
          className={style.edit}
          onClick={() => {
            heddleEditTemp(item.id);
          }}>
          EDIT
        </button>
      )}
      <h3 className={style.title}>{item.city}</h3>
      <div className={style.infoBody}>
        {editBoxID === item.id ? (
          <input
            type='number'
            value={editTemp}
            onChange={heddleTemp}
          />
        ) : (
          <p className={style.temp}>
            {calculateTemp(item.temperature, item.unit)}
          </p>
        )}
        <p className={style.date}>date : {item.date}</p>
      </div>
    </div>
  );
}
