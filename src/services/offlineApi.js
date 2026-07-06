import boards from "../assets/data/boards.json";
import subjects from "../assets/data/subjects.json";
import chapters from "../assets/data/chapters.json";
import topics from "../assets/data/topics.json";
import content from "../assets/data/content.json";

const offlineAPI = {
  // ==========================
  // Boards
  // ==========================
  getBoards() {
    return boards.data;
  },

  // ==========================
  // Classes
  // ==========================
  getClasses(boardId) {
    const board = boards.data.find(
      (b) => Number(b.boardId) === Number(boardId)
    );

    return board ? board.classes : [];
  },

  // ==========================
  // Subjects
  // ==========================
  getSubjects(classId) {
    return subjects.data.filter(
      (item) => Number(item.lms_branch_class_id) === Number(classId)
    );
  },

  // ==========================
  // Chapters
  // ==========================
  getChapters(subjectId) {
    const subject = chapters.data.find(
      (item) => Number(item.lms_subject_id) === Number(subjectId)
    );

    return subject ? subject.chapters : [];
  },

  // ==========================
  // Topics
  // ==========================
  getTopics(chapterId) {
    return topics.data.filter(
      (item) =>
        Number(item.lms_subject_chapter_id) === Number(chapterId)
    );
  },

  // ==========================
  // Content
  // ==========================
  async getContent(classId, subjectId, chapterId, topicId) {
  return content.data.filter(
    (item) =>
      Number(item.lms_branch_class_id) === Number(classId) &&
      Number(item.lms_subject_id) === Number(subjectId) &&
      Number(item.lms_subject_chapter_id) === Number(chapterId) &&
      Number(item.lms_subject_topic_id) === Number(topicId)
  );
},
};

export default offlineAPI;