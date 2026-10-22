
export default async function examRoutes(fastify) {
  // API lấy danh sách đề thi
  fastify.get('/api/exams', async (request, reply) => {
    const exams = await fastify.examService.getAllExams()

    return reply.send({
      success: true,
      data: exams,
    })
  })

  // API lấy chi tiết đề thi theo ID
  fastify.get('/api/exams/:id', async (request, reply) => {
    const id = Number(request.params.id)

    // Bước 1: Kiểm tra ID
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: 'ID đề thi không hợp lệ',
      })
    }

    // Bước 2: Gọi Service lấy đề thi
    const exam = await fastify.examService.getExamById(id)

    // Bước 3: Không tìm thấy đề thi
    if (!exam) {
      return reply.code(404).send({
        success: false,
        message: 'Không tìm thấy đề thi',
      })
    }

    // Bước 4: Trả dữ liệu
    return reply.send({
      success: true,
      data: exam,
    })
  })

  // Lấy danh sách câu hỏi và đáp án theo ID đề thi
fastify.get('/api/exams/:id/questions', async (request, reply) => {
  const examId = Number(request.params.id)

  if (!Number.isInteger(examId) || examId <= 0) {
    return reply.code(400).send({
      success: false,
      message: 'ID đề thi không hợp lệ',
    })
  }

  const exam = await fastify.examService.getExamById(examId)

  if (!exam) {
    return reply.code(404).send({
      success: false,
      message: 'Không tìm thấy đề thi',
    })
  }

  const questions =
    await fastify.examService.getQuestionsByExamId(examId)

  return {
    success: true,
    data: {
      exam,
      questions,
    },
  }
})
}
