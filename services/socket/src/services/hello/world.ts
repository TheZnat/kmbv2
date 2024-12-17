interface IArgs {
    name: string;
}

interface IResult {
    message: string;
}

export const world = async ({ name }: IArgs): Promise<IResult> => {
    if (name) {
        return {
            message: `Hello world, ${name}!`,
        };
    }
    return {
        message: 'Hello world!',
    };
};
