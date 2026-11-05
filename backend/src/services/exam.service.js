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
/// Lấy danh sách đề thi theo LevelID
  const getListExamByLevelId = async (levelID) => {
    const listexam = await fastify.examRepository.getListExamByLevelId(levelID)
    return listexam
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
    getQuestionsByExamId,
    getListExamByLevelId
  }
}