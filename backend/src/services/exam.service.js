export default async function examService(fastify) {
  const getAllExams = async () => {
    const exams = await fastify.examRepository.getAllExams()

    return exams
  }
/// Lấy đề thi theo ID 
  const getExamById = async (id) => {
  const exam = await fastify.examRepository.getExamById(id)

  return exam
}


////
const getQuestionsByExamId = async (examId) => {
  const questions =
    await fastify.examRepository.getQuestionsByExamId(examId)

  return questions
}

  return {
    getAllExams,
    getExamById,
    getQuestionsByExamId
  }
}