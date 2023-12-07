export default function PropertyImages({
  property,
  index = 0,
  className = null,
}) {
  if (!property.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <img
      className={className}
      src={'http://localhost:4000/uploads/' + property.photos[index]}
      alt={property.name}
    />
  );
}
