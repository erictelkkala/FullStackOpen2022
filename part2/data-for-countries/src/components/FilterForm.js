const filterForm = (filter, handler) => (
  <div>
    Find countries:
    <input value={filter} onChange={handler} />
  </div>
);

export default filterForm;
