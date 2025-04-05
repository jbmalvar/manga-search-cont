# Web Development Project 5 - *Manga Search*

Submitted by: **James Joshua Malvar*

This web app: **Web app that utilizes the Jikan API to make a website search*

Time spent: **14** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [X] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Highest Rated Manga out of the 25
    - Average Manga Scores out of the 25
    - Total of Completed Manga out of the 25
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [X] Multiple filters can be applied simultaneously
- [X] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [X] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!
* [X] Added a prev and next button that would show the next 25 due to Jikan Limited Amount
* [X] Added a left side that would allow for the user to see the image as well as description and title that links to the manga  

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Untitled design](https://i.imgur.com/CfhNksm.gif)

Additional Link
https://streamable.com/fa9ihx


imgur link in case: https://imgur.com/a/qw1TqZR


<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
Video Record to Canva then on Imgur
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

Had some struggle with the prev and next had to use copilot for that one to be honest. I had to use AI for a few things when it came to relating to the API calls. Struggled a bit ngl, but I got it done.
However, I can say with confidence that I can now use an API correctly. Little bug with the search not sure why the next and prev work, but when it's filtered it doesn't. Nothing too hard to fix, but
I showed all functionality. Furthermore, since the slider is onchange for the list and filtering, which was on me, it glitches out from the next and prev. The next and prev wasn't intended just an
extra added feature

## License

    Copyright [2025] [James Joshua Malvar]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
