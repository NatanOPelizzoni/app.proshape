export interface TrainingSheet {
	id?: number;
	client_id?: number;
	client_name?: string;
	start_date?: string;
	start_date_formatted?: string;
	end_date?: string;
	end_date_formatted?: string;
	status?: string;
	exercises?: any[];
}
