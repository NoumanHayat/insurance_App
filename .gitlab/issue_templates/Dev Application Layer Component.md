<!-- 
    Application Layer issues define the tasks that need to be completed to, within the Application Layer of an application to support a user story. Each Application Layer Task should describe a single component of the application layer. The separation of components is discretionary and the responsibility of a developer. A good way to decide how to split these items is, if it would be more efficient to have more than one developer work on parts of the task at the same time, then it should be split. 

    NB. This is a template and sections can be filled or left as is where information is or is not available, or sections are or are not relevant.

    Please replace the braces {{  }} and the text between.

    Please provide a clear and concise description of the component, including the expected behaviour to be provided by the resulting code. It should set an expectation for the inputs accepted, the manipulation and computation to take place and any and all outputs to be provided; and to whom they are to be provided.
 -->
Occaecat adipisicing nostrud cupidatat velit tempor do duis tempor pariatur proident. Dolor sit minim eiusmod magna ut qui incididunt voluptate officia ut in nulla. Aliqua proident et consequat ex cillum anim. Aliqua do esse consequat excepteur.

# Dependencies
<!-- 
    The dependencies of an application layer task should take the form of a list of links to information on each dependency. Dependencies should include third party services which the application is expected to consume. It is important to note this is not the place to list application prerequisites to the invocation of the component being described.
 -->

 1. [{{ Dependency Title }}]({{ url to dependency }})

# Checklist
<!-- 
    The Checklist section of each implementation issue is designed to allow a Senior to specify a number of specific implementation requirements for the issue in question. It exists as a task list to be checked off during code review to validate that the code produced meets the specific requirements of the component documented in the issue.
 -->

## Implementation
 - [ ] Does the code meet the acceptance criteria of the task?
 - [ ] Does the code run without any errors?
 - [ ] Are DRY Principles being followed?
 - [ ] Can the code potentially cause any obvious crashes? (eg. off by 1 index errors, null safety ignored, etc)

## Documentation
 - [ ] API Docs updated/added?
 - [ ] Is the logging sufficient?

## Testing & Testability [TBD]
 - [ ] Is the code testable?
 - [ ] Previously defined tests are passed?
 - [ ] Newly written tests are passed?

## Security & Data Privacy
 - [ ] Is authorization/authentication being handled properly?

## Readability
 - [ ] Sufficient use of commenting to help explain the harder parts of the code, workarounds, why something special was done, etc?
 - [ ] Are our [Internal Backend Standards](https://gitlab.com/smsja-ss/internal/team-library/standards/developers/backend/-/wikis/home) being upheld?

/label ~"Type::application" ~"clean-up" 

/estimate {{{{W}}w {{DD}}d {{hh}}h {{mm}}m}}
/weight {{value}}
/milestone %{{"Sprint x"}}
