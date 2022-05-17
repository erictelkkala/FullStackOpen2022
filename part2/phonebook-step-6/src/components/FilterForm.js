const filterForm = (filter, handler) => (
  <div>
    filter shown with:
    <input value={filter} onChange={handler} />
  </div>
);

export default filterForm;
