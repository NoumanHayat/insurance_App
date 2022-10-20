<!-- 
    Presentation layer issues outline the  tasks that need to be completed, within the presentation layer of the application, in order to support a user story. Each Presentation Layer task should describe a single presentation layer component, be it a screen, page, modal or component. The separation of components is discretionary and the responsibility of a developer; a form, for example, may never need to have its own issue; however, if it is to be reused in several areas of the application then it should. A good way to decide how to split these items is, if it would be more efficient to have more than one developer work on parts of the task at the same time, then it should be split. 

    Please follow the instructions in each of the sections below, adhering to the template and replacing the placeholder text as you go.

    NB. This is a template and sections can be filled or left as is where information is or is not available, or sections are or are not relevant.

    Please replace the braces {{  }} and the text between.
   
    Please provide a brief description of what the component is and what value it brings to the application.
 -->
 Nostrud ut nulla commodo ut laboris est sit culpa pariatur ad ea. Velit fugiat excepteur cupidatat ipsum et pariatur nulla duis laboris velit minim cillum sunt labore. Ut sit tempor aliquip tempor.

# Checklist
<!-- 
    The Checklist section of each implementation issue is designed to allow a Senior to specify a number of specific implementation requirements for the issue in question. It exists as a task list to be checked off during code review to validate that the code produced meets the specific requirements of the component documented in the issue.
 -->

## Implementation
 - [ ] Does the code meet the acceptance criteria of the task?
 - [ ] Does the code run without any errors?
 - [ ] Are DRY Principles being followed?
 - [ ] Can the code potentially cause any obvious crashes? (eg. off by 1 index errors, null safety ignored, etc)
 - [ ] Are there any constants/configuration variables still present or have they been properly moved to some configurations file?

## Performance
 - [ ] Is there any obvious negative performance causing blocks of code? (eg. constant re-rendering, loading of large sized assets, etc)

## Documentation
 - [ ] Is the logging sufficient?

## Testing & Testability [TBD]
 - [ ] Is the code testable?
 - [ ] Previously defined tests are passed?
 - [ ] Newly written tests are passed?

## Readability
 - [ ] Is the code properly formatted and making use of our [.eslint rules](https://gitlab.com/smsja-ss/internal/team-library/standards/developers/frontend/-/snippets/2020046)?
 - [ ] Are our [Internal Frontend Standards](https://gitlab.com/smsja-ss/internal/team-library/standards/developers/frontend/-/wikis/home) being upheld?

/label ~"Team::Dev" ~"Type::presentation" ~"clean-up"

/estimate {{{{W}}w {{DD}}d {{hh}}h {{mm}}m}}

/weight {{value}}

/milestone %{{"Sprint x"}}
