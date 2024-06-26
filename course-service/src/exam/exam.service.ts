import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam } from 'src/schema/exam.model';
import { ExamResult, ExamResultDocument } from 'src/schema/examResult.model';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name) private ExamSchema: Model<Exam>,
    @InjectModel(ExamResult.name) private ExamResultSchema: Model<ExamResultDocument>,
  ) {}

  async addExam(examData: any): Promise<Exam> {
    try {
        const formattedQuestions = examData.questions.map((q: any) => ({
            question: q.question,
            correctOption: q.correctOption,
            options: {
                option1: q.option1,
                option2: q.option2,
                option3: q.option3,
                option4: q.option4,
            },
        }));

        let exam = await this.ExamSchema.findOne({ courseId: examData.courseId });
        console.log(exam,'ddddddd');
        
        if (exam) {
            exam.exams = formattedQuestions;
        } else {
            exam = new this.ExamSchema({
                courseId: examData.courseId,
                exams: formattedQuestions,
            });
        }
        console.log(exam,'new exam dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        
        return await exam.save();
    } catch (error) {
        throw new Error(error.message);
    }
}


  async getExamWithCourseId(id: string) {
    try {
      console.log(id);
      const exam = await this.ExamSchema.findOne({ courseId: id });
      console.log(exam);

      if (!exam) {
        throw new Error("Can't find Exam");
      }
      return exam;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async submitExam(userId: string, courseId: string, result: any): Promise<ExamResult> {
    try {
        // Find the exam by courseId
        const exam = await this.ExamSchema.findOne({ courseId });

        if (!exam) {
            throw new Error("Can't find Exam");
        }

        // Calculate the result
        const correctAnswers = [];
        const submittedAnswers = [];

        exam.exams.forEach((question, index) => {
            correctAnswers.push(question.correctOption);
            submittedAnswers.push(result[index].selectedOption);
        });

        let score = 0;
        correctAnswers.forEach((answer, index) => {
            if (answer === submittedAnswers[index]) {
                score++;
            }
        });

        const percentage = (score / exam.exams.length) * 100;

        let examResult = await this.ExamResultSchema.findOne({ userId, courseId });

        if (examResult) {
            examResult.result = submittedAnswers;
            examResult.percentage = percentage;
            examResult = await examResult.save();
        } else {
            examResult = new this.ExamResultSchema({
                courseId,
                userId,
                result: submittedAnswers,
                percentage,
            });
            examResult = await examResult.save();
        }

        return examResult;
    } catch (error) {
        throw new Error(error.message);
    }
}

}