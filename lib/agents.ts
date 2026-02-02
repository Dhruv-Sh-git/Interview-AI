import { Message } from "@/components/interview/ChatInterface";

const QUESTIONS = [
    {
        id: "q1",
        text: "Welcome to the technical interview. I'm your AI interviewer. Let's start with a classic Data Structures question. \n\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. \n\nCan you explain your approach first?",
        type: "dsa",
        difficulty: "easy"
    },
    {
        id: "q2",
        text: "That's a solid brute force approach. However, for a large dataset, O(N^2) might be too slow. Can you optimize this using a Hash Map to achieve O(N) time complexity?",
        type: "dsa",
        difficulty: "medium"
    },
    {
        id: "q3",
        text: "Great implementation. Now, let's shift gears to System Design. \n\nDesign a URL shortener service like Bit.ly. What are the key requirements you would consider?",
        type: "system_design",
        difficulty: "hard"
    },
    {
        id: "end",
        text: "Thank you for your time. I've gathered enough data to generate your feedback report. You demonstrated strong problem-solving skills in DSA but could improve on defining non-functional requirements in system design earlier. \n\n**Final Result: Strong Hire.**",
        type: "feedback",
        difficulty: "n/a"
    }
];

export class InterviewAgent {
    private currentStep = 0;

    async startInterview(): Promise<Message> {
        this.currentStep = 0;
        return {
            id: "init",
            role: "assistant",
            content: QUESTIONS[0].text,
            timestamp: new Date()
        };
    }

    async processResponse(userMessage: string): Promise<Message> {
        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        this.currentStep++;
        const nextQ = QUESTIONS[this.currentStep] || QUESTIONS[QUESTIONS.length - 1];

        if (this.currentStep >= QUESTIONS.length) {
            return {
                id: Date.now().toString(),
                role: "assistant",
                content: "The interview is complete. Refresh to start over.",
                timestamp: new Date()
            };
        }

        return {
            id: Date.now().toString(),
            role: "assistant",
            content: nextQ.text,
            timestamp: new Date()
        };
    }
}

export const interviewAgent = new InterviewAgent();
