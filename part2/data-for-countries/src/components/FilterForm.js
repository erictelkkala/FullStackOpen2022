const filterForm = (filter, handler) => {
  return (
    <div>
      Find countries:
      <input value={filter} onChange={handler} />
    </div>
  );
};

export default filterForm;
