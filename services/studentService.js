const { validateStudent } = require('../utils/validate');
const Student = require('../models/Student');

const createStudent = async (studentData) => {
  const { error } = validateStudent(studentData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const newStudent = new Student(studentData);
  await newStudent.save();
  return newStudent;
};

const updateStudent = async (studentId, studentData) => {
  const { error } = validateStudent(studentData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const updatedStudent = await Student.findByIdAndUpdate(studentId, studentData, { new: true });
  return updatedStudent;
};

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  return student;
};

const getAllStudents = async () => {
  const students = await Student.find();
  return students;
};

const deleteStudent = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};

module.exports = {
  createStudent,
  updateStudent,
  getStudentById,
  getAllStudents,
  deleteStudent,
};
