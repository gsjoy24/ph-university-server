const calculateGradePoint = (totalMarks: number) => {
  let result = {
    grade: 'N/A',
    gradePoint: 0,
  };

  /**
   *  0 -19 : F
   * 20 - 39 : D
   * 40 - 59 : C
   * 60 - 79 : B
   * 80 - 100 : A
   */

  if (totalMarks >= 0 && totalMarks <= 19) {
    result = {
      grade: 'F',
      gradePoint: 0.0,
    };
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    result = {
      grade: 'D',
      gradePoint: 2.0,
    };
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    result = {
      grade: 'C',
      gradePoint: 3.0,
    };
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    result = {
      grade: 'B',
      gradePoint: 3.5,
    };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result = {
      grade: 'A',
      gradePoint: 4,
    };
  } else {
    result = {
      grade: 'N/A',
      gradePoint: 0,
    };
  }
  return result;
};

export default calculateGradePoint;
