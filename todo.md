# To-Do: Homepage

Tasks are classified according to priority into [current](#current), [important](#important) and [other](#other), and are ordered within each classification from the most to the least important.

> [!NOTE]
> Pull requests implementing the tasks in this document will be rejected. If you wish to contribute, you can try to resolve one or more of the [issues](https://github.com/alikamel-dev/homepage/issues) or otherwise make a contribution that you believe will improve the project.

## Current

- [ ] Audit webpage.

## Important

- [ ] Find a way to prevent browser extensions from adding and/or overwriting styles.

- [ ] Find a way to make author name fit its container without using _Fit-Text_ (and preferably without using an external library at all).

- [X] Add project screenshots.
  - [ ] Implement responsive project images (resolution switching).

- [ ] Make scroll-driven animations play only on scrolling down or once per page load (whichever is better for user experience)

- [ ] Add themes for Islamic occasions

### Accessibility

- [ ] Create custom tooltips, instead of the built-in ones created using the poorly accessible `title` attribute.
- [ ] Resolve any accessibility issues caused by `display: contents;`.
- [ ] Resolve any accessibility issues not listed here.

### Layout

- [ ] Prevent the _about me_ section from having a greater height than the author photo in smaller viewport widths using the desktop layout.

### Animations

- [ ] Improve animations in _contact me_ section.
  - [ ] Use scroll-triggered instead of scroll-driven animations if it yields better results.
  - [ ] Animate author footer image `width` instead of `translate`.
- [ ] Create scroll-triggered animations for project card tag `width`.

- [ ] Use more suitable easing functions for animations.

## Other

- [ ] Make the left and right padding of the author name in the mobile layout match those in the design file.

- [ ] Set a suitable `font-size` for `H4`, `H5` and `H6` elements.
- [ ] Set a suitable `line-height` for headings.

- [ ] Change `max-inline-size` of text in _about me_ section to `60ch` if this can be accomplished using the same padding in the design file.
