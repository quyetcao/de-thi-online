
export default async function examRepository(fastify) {
  const getAllExams = async () => {
    const result = await fastify.db.query(`
      SELECT
        e.id,
        e.title,
        e.description,
        e.duration_minutes,
        e.passing_score,
        e.show_result,
        e.show_answers_after_submit,
        e.is_active,
        e.sort_order,
        l.id AS level_id,
        l.name AS level_name,
        s.id AS sector_id,
        s.name AS sector_name
      FROM exams e
      JOIN levels l ON l.id = e.level_id
      JOIN sectors s ON s.id = l.sector_id
      WHERE e.is_active = true
      ORDER BY
        s.sort_order,
        l.sort_order,
        e.sort_order,
        e.id
    `)

    return result.rows
  }

  // Lấy một đề thi theo ID
  const getExamById = async (id) => {
    const result = await fastify.db.query(
      `
        SELECT
          e.id,
          e.title,
          e.description,
          e.duration_minutes,
          e.passing_score,
          e.show_result,
          e.show_answers_after_submit,
          e.is_active,
          e.sort_order,
          l.id AS level_id,
          l.name AS level_name,
          s.id AS sector_id,
          s.name AS sector_name
        FROM exams e
        JOIN levels l ON l.id = e.level_id
        JOIN sectors s ON s.id = l.sector_id
        WHERE e.id = $1
          AND e.is_active = true
      `,
      [id]
    )

    return result.rows[0] ?? null
  }

   // Lấy danh sách câu hỏi và đáp án theo ID đề thi
  const getQuestionsByExamId = async (examId) => {
    const result = await fastify.db.query(
      `
        SELECT
          q.id AS question_id,
          q.question_text,
          q.sort_order AS question_sort_order,
          a.id AS answer_id,
          a.answer_key,
          a.answer_text,
          a.sort_order AS answer_sort_order
        FROM questions q
        LEFT JOIN answers a
          ON a.question_id = q.id
        WHERE q.exam_id = $1
        ORDER BY
          q.sort_order ASC,
          q.id ASC,
          a.sort_order ASC,
          a.id ASC
      `,
      [examId]
    )

    const questions = []
const questionMap = new Map()

for (const row of result.rows) {
  let question = questionMap.get(row.question_id)

  if (!question) {
    question = {
      id: row.question_id,
      question_text: row.question_text,
      sort_order: row.question_sort_order,
      answers: [],
    }

    questionMap.set(row.question_id, question)
    questions.push(question)
  }

  if (row.answer_id !== null) {
    question.answers.push({
      id: row.answer_id,
      answer_key: row.answer_key,
      answer_text: row.answer_text,
      sort_order: row.answer_sort_order,
    })
  }
}

return questions
  }

  return {
    getAllExams,
    getExamById,
    getQuestionsByExamId,
  }
}
