const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;


app.use(cors());


app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));


const correctAnswers = {
    0: 'JSX',
    1: 'State is a built-in React object that represents the current state of a component',
    2: 'Props (short for properties) are a way of passing data from parent to child components',
    3: 'The virtual DOM (VDOM) is a lightweight copy of the actual DOM in memory',
    4: 'The component lifecycle in React refers to the phases a component goes through from initialization to destruction',
    5: 'A higher-order component (HOC) is a function that takes a component and returns a new component with additional functionality',
    6: 'Controlled components are components whose value is controlled by React, while uncontrolled components maintain their own state',
    7: 'Class components are ES6 classes that extend from React.Component and have their own state and lifecycle methods, whereas functional components are just plain JavaScript functions that accept props as arguments and return React elements',
    8: 'Redux is a predictable state container for JavaScript apps that helps manage application state in a single immutable store',
    9: 'React Hooks are functions that let you use state and other React features without writing a class',
};


app.post('/submit', (req, res) => {
    const submittedAnswers = req.body.answers;

    
    if (!submittedAnswers || typeof submittedAnswers !== 'object') {
        return res.status(400).json({ error: 'Answers not provided or invalid format' });
    }

    
    const validationResults = {};
    for (const questionIndex in submittedAnswers) {
        if (submittedAnswers.hasOwnProperty(questionIndex)) {
            const submittedAnswer = submittedAnswers[questionIndex];
            const correctAnswer = correctAnswers[questionIndex];

            const isCorrect = submittedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
            validationResults[questionIndex] = isCorrect;
        }
    }


    return res.json({ validationResults });
});



app.get('/answer-count', (req, res) => {
    
    const correctCount = Object.values(correctAnswers).filter(answer => answer).length;

    
    const totalQuestions = Object.keys(correctAnswers).length;
    const incorrectCount = totalQuestions - correctCount;

    return res.json({ correctCount, incorrectCount });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
