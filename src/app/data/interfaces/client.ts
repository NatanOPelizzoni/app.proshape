export interface Client {
	id?: number;
	name?: string;
	email?: string;
	status?: string;
	birth_date?: Date;
	weight?: number;
	height?: number;
	fitness_goals?: string;
	training_frequency?: number;
	health_restrictions?: string;
	preferred_workout_type?: string;
	exercise_history?: string;
	current_fitness_level?: string;
	injuries_or_surgeries?: string;
	instructor_id?: number;
	user_id?: number;
}
