const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => (
  <p>
    <b>
      {/* Calculate the total using Array.reduce */}
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Courses = ({ courses }) => (
  <>
    {courses.map((course) => {
      // Return the finished course
      return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      );
    })}
  </>
);

export default Courses;
