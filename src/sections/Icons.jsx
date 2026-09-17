/* Icons, from the SVGs supplied by the client (Noun Project).

   Three things had to change to make them usable, and they are worth recording
   because the same faults will come back with the next icon:

   1. Both were hard-coded `fill="#ffffff"`, which is invisible on the cream
      Get in touch button. They take `currentColor` here instead, so an icon is
      the colour of the text beside it wherever it is used.
   2. Both carried the Noun Project attribution as <text> inside the artwork,
      which would have rendered as unreadable 5px type inside the glyph. It is
      dropped: these are licensed under the client's paid Noun Project plan, so
      no on-page credit is required.
   3. The arrow was an INVERTED icon: a filled 100x100 square with the chevron
      knocked out of it. That is why its PNG looked like a blank white square.
      Only the chevron sub-path is kept.
 */

export function Plane({ className = 'btn-ico' }) {
  return (
    <svg className={className} viewBox="2.3 -5.41 97.57 108.27" aria-hidden="true">
      <path d="m96.859 5.875c0-0.09375 0-0.20312-0.03125-0.29688-0.015625-0.0625-0.046875-0.14062-0.078125-0.20312-0.046875-0.09375-0.078125-0.20312-0.14062-0.29688 0-0.015625-0.015625-0.046875-0.03125-0.078125-0.03125-0.046875-0.078125-0.0625-0.10938-0.09375-0.0625-0.078125-0.14062-0.14062-0.21875-0.21875-0.0625-0.046875-0.14062-0.09375-0.21875-0.125-0.046875-0.03125-0.078125-0.0625-0.125-0.078125s-0.078125 0-0.125-0.03125c-0.078125-0.03125-0.17188-0.046875-0.25-0.0625-0.09375 0-0.17188-0.015625-0.26562 0-0.09375 0-0.17188 0-0.26562 0.03125-0.09375 0.015625-0.1875 0.046875-0.26562 0.078125-0.046875 0.015625-0.10938 0.015625-0.15625 0.046875l-90.625 47.719c-0.54688 0.29688-0.875 0.89062-0.82812 1.5156s0.46875 1.1562 1.0625 1.3594l31.406 10.469 7.9844 28.875 0.046875 0.09375c0.015625 0.0625 0.0625 0.125 0.09375 0.1875 0.0625 0.10938 0.125 0.21875 0.20312 0.3125 0.03125 0.03125 0.03125 0.0625 0.0625 0.09375 0.015625 0.015625 0.046875 0.03125 0.078125 0.046875 0.10938 0.09375 0.21875 0.15625 0.34375 0.21875 0.046875 0.03125 0.09375 0.0625 0.14062 0.078125 0.17188 0.0625 0.35938 0.10938 0.54688 0.10938h0.10938c0.10938 0 0.20312-0.046875 0.3125-0.078125 0.0625-0.015625 0.125-0.015625 0.1875-0.046875 0.17188-0.078125 0.34375-0.1875 0.48438-0.3125l14.453-14.453 21.391 14.141c0.26562 0.17188 0.5625 0.26562 0.85938 0.26562 0.21875 0 0.4375-0.046875 0.64062-0.14062 0.48438-0.21875 0.82812-0.67188 0.90625-1.2031l12.422-87.625v-0.046875-0.23438zm-50.109 63.672s-0.015625 0.0625-0.03125 0.078125c-0.0625 0.09375-0.09375 0.1875-0.125 0.28125s-0.078125 0.1875-0.09375 0.28125c0 0.03125-0.015625 0.046875-0.03125 0.078125l-1.9531 15.797-5.875-21.234 43.359-43.359-35.234 48.062zm40.172-57.422-50.469 50.469-27.797-9.2656zm-39.719 77.609 2.0469-16.578 8.7344 5.7812-10.797 10.797zm34.5 1.1562-31.453-20.812 42.641-58.188-11.188 78.984z" fill="currentColor" />
    </svg>
  )
}

export function Arrow({ className = 'bullet-arrow' }) {
  return (
    <svg className={className} viewBox="22 22 56 56" aria-hidden="true">
      <path d="M34.58,30.83,40.42,25l25,25-25,25-5.84-5.83L53.75,50Z" fill="currentColor" />
    </svg>
  )
}
