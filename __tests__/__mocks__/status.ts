export const mockPost = async() => ({
	json: vi.fn().mockResolvedValue([]),
	status: 201
});

export const conflitPost = async() => ({
	json: vi.fn().mockResolvedValue([]),
	status: 409
});

export const badRequest = async() => ({
	json: vi.fn().mockResolvedValue([]),
	status: 400
});

export const failPost = async() => ({
	json: vi.fn().mockResolvedValue([]),
	status: 500
});