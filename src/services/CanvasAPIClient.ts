// CanvasAPIClient.ts

interface Course {
    id: number;
    name: string;
    term: string;
}

interface Assignment {
    id: number;
    name: string;
    due_date: string;
}

interface Grade {
    assignment_id: number;
    grade: string;
}

interface Module {
    id: number;
    name: string;
    module_items: Array<any>;
}

class CanvasAPIClient {
    private baseUrl: string;
    private authToken: string;

    constructor(baseUrl: string, authToken: string) {
        this.baseUrl = baseUrl;
        this.authToken = authToken;
    }

    private async fetch(endpoint: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.authToken}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    public getCourses(): Promise<Course[]> {
        return this.fetch('/api/v1/courses');
    }

    public getAssignments(courseId: number): Promise<Assignment[]> {
        return this.fetch(`/api/v1/courses/${courseId}/assignments`);
    }

    public getGrades(courseId: number): Promise<Grade[]> {
        return this.fetch(`/api/v1/courses/${courseId}/students/grades`);
    }

    public getModules(courseId: number): Promise<Module[]> {
        return this.fetch(`/api/v1/courses/${courseId}/modules`);
    }
}

export default CanvasAPIClient;